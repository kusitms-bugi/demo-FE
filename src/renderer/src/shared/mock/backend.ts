import type {
  AttendanceQueryParams,
  AttendanceResponse,
  AverageScoreResponse,
  HighlightQueryParams,
  HighlightResponse,
  LevelResponse,
  PostureGraphResponse,
  PosturePatternResponse,
} from '@entities/dashboard';
import type {
  CreateSessionResponse,
  MetricData,
  SaveMetricsResponse,
  SessionActionResponse,
  SessionReportResponse,
} from '@entities/session';

type StoredMetric = MetricData;

const LS_SESSIONS = 'mock:sessions';

function nowIso() {
  return new Date().toISOString();
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function seededNumber(seed: string) {
  // deterministic pseudo-random [0, 1)
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const u = h >>> 0;
  return (u % 10_000) / 10_000;
}

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function shiftDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function readSessionIds(): string[] {
  try {
    const raw = localStorage.getItem(LS_SESSIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function writeSessionIds(ids: string[]) {
  localStorage.setItem(LS_SESSIONS, JSON.stringify(ids));
}

function metricsKey(sessionId: string) {
  return `mock:sessions:${sessionId}:metrics`;
}

function readMetrics(sessionId: string): StoredMetric[] {
  try {
    const raw = localStorage.getItem(metricsKey(sessionId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredMetric[]) : [];
  } catch {
    return [];
  }
}

function writeMetrics(sessionId: string, metrics: StoredMetric[]) {
  localStorage.setItem(metricsKey(sessionId), JSON.stringify(metrics));
}

function aggregateAllMetrics(): StoredMetric[] {
  const ids = readSessionIds();
  const all: StoredMetric[] = [];
  for (const id of ids) all.push(...readMetrics(id));
  return all.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

function computeAverageScore(metrics: StoredMetric[]) {
  if (metrics.length === 0) return 70;
  const avgLevel =
    metrics.reduce((sum, m) => sum + clamp(m.score, 1, 6), 0) / metrics.length;
  // map 1..6 -> 90..30 (good -> higher score)
  const mapped = 100 - (avgLevel - 1) * 14;
  return Math.round(clamp(mapped, 10, 100));
}

function computeLevelProgress(metrics: StoredMetric[]) {
  // simple XP: good frames give more
  const xp = metrics.reduce((sum, m) => sum + (m.score <= 3 ? 5 : 1), 0);
  const level = Math.floor(xp / 1000);
  const current = xp % 1000;
  const required = 1000;
  return { level, current, required };
}

function dailyPoints(days: number) {
  const all = aggregateAllMetrics();
  const map: Record<string, number[]> = {};
  for (const m of all) {
    const day = m.timestamp.slice(0, 10);
    (map[day] ??= []).push(m.score);
  }

  const today = new Date();
  const points: Record<string, number> = {};
  for (let i = days - 1; i >= 0; i--) {
    const day = dateKey(shiftDays(today, -i));
    const scores = map[day];
    if (scores && scores.length > 0) {
      points[day] = computeAverageScore(
        scores.map((s) => ({ score: s, timestamp: day })),
      );
    } else {
      const r = seededNumber(day);
      points[day] = Math.round(55 + r * 35); // 55..90
    }
  }
  return points;
}

function makeSessionAction(): SessionActionResponse {
  return {
    timestamp: nowIso(),
    success: true,
    code: 'OK',
    message: 'mock',
  };
}

export const mockBackend = {
  createSession: async (): Promise<CreateSessionResponse> => {
    const sessionId = `mock_${Date.now().toString(36)}`;
    const ids = readSessionIds();
    if (!ids.includes(sessionId)) {
      ids.push(sessionId);
      writeSessionIds(ids);
    }
    return {
      timestamp: nowIso(),
      success: true,
      data: { sessionId },
      code: 'OK',
      message: 'mock',
    };
  },

  saveMetrics: async (
    sessionId: string,
    metrics: MetricData[],
  ): Promise<SaveMetricsResponse> => {
    const prev = readMetrics(sessionId);
    writeMetrics(sessionId, [...prev, ...metrics]);
    return { timestamp: nowIso(), success: true, code: 'OK', message: 'mock' };
  },

  pauseSession: async (_sessionId: string): Promise<SessionActionResponse> =>
    makeSessionAction(),
  resumeSession: async (_sessionId: string): Promise<SessionActionResponse> =>
    makeSessionAction(),
  stopSession: async (_sessionId: string): Promise<SessionActionResponse> =>
    makeSessionAction(),

  sessionReport: async (sessionId: string): Promise<SessionReportResponse> => {
    const metrics = readMetrics(sessionId);
    const sorted = metrics
      .slice()
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const totalSeconds =
      sorted.length >= 2
        ? Math.max(
            0,
            Math.round(
              (Date.parse(sorted[sorted.length - 1]!.timestamp) -
                Date.parse(sorted[0]!.timestamp)) /
                1000,
            ),
          )
        : sorted.length;
    const goodSeconds = Math.round(
      totalSeconds *
        (sorted.filter((m) => m.score <= 3).length / Math.max(1, sorted.length)),
    );
    const score = computeAverageScore(sorted);

    return {
      timestamp: nowIso(),
      success: true,
      data: { totalSeconds, goodSeconds, score },
      code: 'OK',
      message: 'mock',
    };
  },

  averageScore: async (): Promise<AverageScoreResponse> => ({
    timestamp: nowIso(),
    success: true,
    data: { score: computeAverageScore(aggregateAllMetrics()) },
    code: 'OK',
    message: null,
  }),

  level: async (): Promise<LevelResponse> => {
    const { level, current, required } = computeLevelProgress(aggregateAllMetrics());
    return {
      timestamp: nowIso(),
      success: true,
      data: { level, current, required },
      code: 'OK',
      message: null,
    };
  },

  postureGraph: async (): Promise<PostureGraphResponse> => ({
    timestamp: nowIso(),
    success: true,
    data: { points: dailyPoints(31) },
    code: 'OK',
    message: null,
  }),

  posturePattern: async (): Promise<PosturePatternResponse> => ({
    timestamp: nowIso(),
    success: true,
    data: {
      worstTime: '14:00:00',
      worstDay: 'FRIDAY',
      recovery: 12,
      stretching: '30분마다 목/어깨 스트레칭을 해보세요.',
    },
    code: 'OK',
    message: 'mock',
  }),

  highlight: async (params: HighlightQueryParams): Promise<HighlightResponse> => {
    const base = params.period === 'MONTHLY' ? 420 : 110;
    const r = seededNumber(`${params.period}:${params.year}:${params.month ?? ''}`);
    const current = Math.round(base + r * 60);
    const previous = Math.round(base - 30 + r * 50);
    return {
      timestamp: nowIso(),
      success: true,
      data: { current, previous },
      code: 'OK',
      message: 'mock',
    };
  },

  attendance: async (params: AttendanceQueryParams): Promise<AttendanceResponse> => {
    const now = new Date();
    const attendances: Record<string, number> = {};
    const days =
      params.period === 'WEEKLY' ? 7 : params.period === 'MONTHLY' ? 31 : 365;

    for (let i = 0; i < days; i++) {
      const d = shiftDays(now, -i);
      if (d.getFullYear() !== params.year) continue;
      if (params.month !== undefined && d.getMonth() + 1 !== params.month) continue;
      const key = dateKey(d);
      const r = seededNumber(key);
      attendances[key] = (Math.floor(r * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    }

    const title =
      params.period === 'WEEKLY'
        ? '이번 주 출석'
        : params.period === 'MONTHLY'
          ? '이번 달 출석'
          : '올해 출석';

    return {
      timestamp: nowIso(),
      success: true,
      data: {
        attendances,
        title,
        content1: '바른 자세를 유지하는 것만으로도 업무 효율이 n% 올라요!',
        content2: '거북목 자세는 목과 어깨뿐만 아니라 척추에도 무리를 줘요.',
        subContent: '7일 이상 사용하여 거부기린이 분석한 <br/>개인화 데이터를 열람해보세요!',
      },
      code: 'OK',
      message: 'mock',
    };
  },
};

