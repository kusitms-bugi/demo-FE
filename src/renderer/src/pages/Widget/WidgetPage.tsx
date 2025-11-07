/* 위젯 창에 표시될 페이지 - 반응형 */

import { useState, useEffect } from 'react';
import { WidgetTitleBar } from '../../components/WidgetTitleBar/WidgetTitleBar';
import MiniGiraffe from '../../assets/widget/mini_giraffe.svg?react';
import MediumGiraffe from '../../assets/widget/medium_giraffe.svg?react';
import MiniTurtle from '../../assets/widget/mini_turtle.svg?react';
import MediumTurtle from '../../assets/widget/medium_turtle.svg?react';

type WidgetSize = 'mini' | 'medium';

/* 실시간 자세 판별 */
type PostureState = 'turtle' | 'giraffe';

/* 레이아웃 전환 기준점 (widgetConfig.ts와 동일) */
const BREAKPOINT = {
  height: 62,
} as const;

export function WidgetPage() {
  const [widgetSize, setWidgetSize] = useState<WidgetSize>('medium');
  /* 기본 상태 기린 */
  const [postureState, setPostureState] = useState<PostureState>('giraffe');

  /* 다크모드 설정 적용 */
  useEffect(() => {
    const applyTheme = () => {
      const isDark = localStorage.getItem('theme') === 'dark';
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // 초기 테마 적용
    applyTheme();

    // 메인 창에서 테마 변경 시 자동 반영
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        applyTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    /* resize 디바운스 타이머 ID 저장용 변수 */
    let resizeTimeout: number;

    /* 창 크기 변경 감지 핸들러 */
    const handleResize = () => {
      const isMedium = innerHeight > BREAKPOINT.height;
      /* breakpoint를 넘으면 medium, 아니면 mini */
      setWidgetSize(isMedium ? 'medium' : 'mini');
    };

    /* 디바운스 래퍼 함수 */
    const handleResizeDebounced = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        handleResize();
      }, 10);
    };

    handleResize();
    window.addEventListener('resize', handleResizeDebounced);

    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const isMini = widgetSize === 'mini';

  return (
    <div className="bg-grey-0 h-screen w-screen overflow-hidden rounded-lg px-1 py-[5px]">
      <div className={isMini ? 'flex h-full w-full' : 'h-full w-full'}>
        {/* 커스텀 타이틀바 */}
        <WidgetTitleBar isMini={isMini} />

        {/* 위젯 내용 - 창 크기에 따라 자동 전환 */}
        {isMini ? (
          <MiniWidgetContent posture={postureState} />
        ) : (
          <MediumWidgetContent posture={postureState} />
        )}
      </div>
    </div>
  );
}

/* 미니 위젯 레이아웃 - 최대 50px 높이에 맞게 가로 배치 */
function MiniWidgetContent({ posture }: { posture: PostureState }) {
  const isGiraffe = posture === 'giraffe';
  const gradient = isGiraffe
    ? 'linear-gradient(180deg, var(--color-olive-green) 0.18%, var(--color-success) 99.7%)'
    : 'linear-gradient(180deg, var(--color-coral-red) 0%, var(--color-error) 100%)';

  return (
    <div className="bg-grey-100 relative flex w-full items-center rounded-lg transition-colors duration-500 ease-in-out">
      {/* 캐릭터 이미지 영역 - 작게 */}
      <div
        className="h-full w-full rounded-lg transition-all duration-500 ease-in-out"
        style={{ width: '80%', background: gradient }}
      ></div>
      <div className="absolute flex h-full">
        {isGiraffe ? (
          <MiniGiraffe className="h-full w-full object-contain" />
        ) : (
          <MiniTurtle className="h-full w-full object-contain" />
        )}
      </div>
    </div>
  );
}

/* 미디엄 위젯 레이아웃 */
function MediumWidgetContent({ posture }: { posture: PostureState }) {
  const isGiraffe = posture === 'giraffe';
  const gradient = isGiraffe
    ? 'linear-gradient(180deg, var(--color-olive-green) 0.18%, var(--color-success) 99.7%)'
    : 'linear-gradient(180deg, var(--color-coral-red) 0%, var(--color-error) 100%)';

  return (
    <div className="flex h-full w-full flex-col transition-colors duration-500 ease-in-out">
      {/* 캐릭터 영역 */}
      <div
        className="mini:h-auto mini: mb-[3px] flex aspect-[1/1] h-full w-full flex-1 rounded-lg transition-all duration-500 ease-in-out"
        style={{ background: gradient }}
      >
        {isGiraffe ? (
          <MediumGiraffe className="ml-[-10px] h-full object-contain" />
        ) : (
          <MediumTurtle className="h-full object-contain" />
        )}
      </div>

      {/* 상세 정보 영역 */}
      <div className="bg-grey-0 flex w-full flex-1 flex-col justify-center px-2">
        {/* 진행 바 */}
        <div className="h-fit w-full rounded-lg">
          <div className="bg-grey-50 h-3 w-full rounded-full">
            <div
              className="flex h-full justify-end rounded-lg bg-green-500 p-[2px] transition-all duration-500 ease-in-out"
              style={{ width: '60%', background: gradient }}
            >
              <div className="bg-grey-0 h-2 w-2 rounded-full opacity-50" />
            </div>
          </div>
        </div>

        {/* 메시지 */}
        <div className="bg-grey-0 mt-2">
          <div className="text-body-md-semibold text-grey-700">
            {isGiraffe
              ? '좋아요, 기린 상태 유지중!'
              : '앗! 지금은 거북이 상태예요'}
          </div>
          <div className="text-caption-xs-meidum text-grey-400">
            {isGiraffe ? '집중력 최고 상태에요' : '42인치 TV를 얹고 있어요'}
          </div>
        </div>
      </div>
    </div>
  );
}
