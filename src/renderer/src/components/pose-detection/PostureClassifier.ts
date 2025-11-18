import { getScoreLevel } from '../../utils/getScoreLevel';
import { EmaSmoother } from './calculations';
import { PostureStabilizer } from './PostureStabilizer';
import { ScoreProcessor } from './ScoreProcessor';
import { FrontalityResult, PIResult, PostureClassification } from './types';

const SCORE_UPDATE_INTERVAL_MS = 500; // 안정화 검사 및 점수 업데이트 주기

// 자세 판정 엔진
export class PostureClassifier {
  private prevState = {
    PI_EMA: null as number | null,
    state: 'normal' as 'normal' | 'bad',
  };

  private emaSmoother = new EmaSmoother(0.25);
  private scoreProcessor = new ScoreProcessor();
  private stabilizer = new PostureStabilizer(500, 0.5, 5); // windowMs=500ms, threshold=0.5, minBufferSize=5

  // 마지막으로 반환된 안정화된 상태
  private lastStableState: PostureClassification | null = null;
  // 마지막 스코어 업데이트 시간
  private lastScoreUpdateTime: number = 0;

  classify(
    piData: PIResult,
    mu: number,
    sigma: number,
    frontality: FrontalityResult,
  ): PostureClassification {
    const currentTime = Date.now();

    // 캘리브레이션 데이터가 유효하지 않으면 초기 상태 반환
    if (sigma === 0) {
      return (
        this.lastStableState ?? {
          text: '측정중',
          cls: 0,
          zScore: 0,
          PI_EMA: 0,
          z_PI: 0,
          gamma: 0,
          Score: 0,
          events: [],
        }
      );
    }

    const PI_raw = piData.PI_raw;
    const PI_EMA = this.emaSmoother.next(PI_raw);
    const z_PI = (PI_EMA - mu) / (sigma + 1e-6);
    const gamma = 1.0;
    const rawScore = gamma * z_PI;
    const finalScore = this.scoreProcessor.next(rawScore);

    // 현재 프레임의 분류 결과 생성
    const currentClassification = this.createClassification(finalScore, {
      PI_EMA,
      z_PI,
      gamma,
    });

    // 안정화 버퍼에 현재 점수 추가
    this.stabilizer.addScore(currentClassification.Score, currentTime);

    // 업데이트 주기(500ms)가 되지 않았으면 이전 상태 반환
    if (
      currentTime - this.lastScoreUpdateTime < SCORE_UPDATE_INTERVAL_MS &&
      this.lastStableState
    ) {
      return this.lastStableState;
    }

    // 안정화 검사
    const shouldUpdate = this.stabilizer.shouldUpdate(
      currentClassification.Score,
    );

    if (shouldUpdate) {
      // 안정화 통과: 새로운 상태를 안정된 상태로 업데이트
      this.lastStableState = currentClassification;
    }
    // 안정화 실패 시, lastStableState는 변경되지 않고 유지됨

    // 업데이트 시간 갱신
    this.lastScoreUpdateTime = currentTime;

    // 항상 마지막으로 안정화된 상태를 반환 (실패 시 이전 상태가 반환됨)
    return (
      this.lastStableState ?? {
        // 초기 상태 (null일 경우 대비)
        text: '측정중',
        cls: 0,
        zScore: 0,
        PI_EMA: 0,
        z_PI: 0,
        gamma: 0,
        Score: 0,
        events: [],
      }
    );
  }

  /**
   * 점수와 추가 데이터를 기반으로 PostureClassification 객체를 생성합니다.
   * 히스테리시스 로직을 포함합니다.
   */
  private createClassification(
    score: number,
    details: { PI_EMA: number; z_PI: number; gamma: number },
  ): PostureClassification {
    const enter_bad = 1.2;
    const exit_bad = 0.8;

    let newState = this.prevState.state;
    const events: string[] = [];

    if (this.prevState.state === 'normal' && score >= enter_bad) {
      newState = 'bad';
      events.push('enter_bad');
    } else if (this.prevState.state === 'bad' && score <= exit_bad) {
      newState = 'normal';
      events.push('exit_bad');
    }

    this.prevState = { PI_EMA: details.PI_EMA, state: newState };

    const levelInfo = getScoreLevel(score);

    return {
      text: levelInfo.name,
      cls: levelInfo.level,
      zScore: score,
      Score: score,
      events,
      ...details,
    };
  }

  reset() {
    this.prevState = { PI_EMA: null, state: 'normal' };
    this.emaSmoother.reset();
    this.scoreProcessor.reset();
    this.stabilizer.reset();
    this.lastStableState = null;
    this.lastScoreUpdateTime = 0;
  }
}
