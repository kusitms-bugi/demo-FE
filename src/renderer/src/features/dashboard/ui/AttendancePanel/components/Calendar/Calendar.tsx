import { buildCalendarDays, formatDateKey, getTodayParts, isFutureDay } from '@features/dashboard/ui/AttendancePanel/utils';

type CalendarProps = {
  year: number;
  month: number; // 0~11
  attendances?: Record<string, number>; // 날짜별 사용 시간(분)
};

interface CircleProps {
  level: number | null;
  today: boolean;
  future: boolean;
}

const LEVEL_COLORS = [
  'bg-yellow-100', // 1레벨 (0~1시간): 가장 연한 노란색
  'bg-yellow-200', // 2레벨 (1 초과~2 시간 미만): 2단계 노랑
  'bg-yellow-300', // 3레벨 (2 시간 이상~3 시간 미만): 3단계 노랑
  'bg-yellow-400', // 4레벨 (3 이상~4 미만): 4단계 노랑
  'bg-yellow-500', // 5레벨 (4 이상): 5단계 노랑 (가장 진한 노란색)
] as const;

const getLevelFromHours = (hours: number): number => {
  if (hours <= 1) return 1;
  if (hours < 2) return 2;
  if (hours < 3) return 3;
  if (hours < 4) return 4;
  return 5;
};

const Circle = ({ level, today, future }: CircleProps) => {
  if (future) {
    return (
      <div className="border-bg-line h-[18px] w-[18px] rounded-full border bg-transparent" />
    );
  }

  if (!level) {
    return (
      <div
        className={[
          'bg-grey-50 h-[18px] w-[18px] rounded-full',
          today
            ? 'ring-offset-grey-0 ring-2 ring-yellow-500 ring-offset-2'
            : '',
        ].join(' ')}
      />
    );
  }

  const clampedLevel = Math.min(Math.max(level, 1), LEVEL_COLORS.length);
  const colorClass = LEVEL_COLORS[clampedLevel - 1];

  return (
    <div
      className={[
        'h-[18px] w-[18px] rounded-full',
        colorClass,
        today ? 'ring-offset-grey-0 ring-2 ring-yellow-500 ring-offset-2' : '',
      ].join(' ')}
    />
  );
};

const Calendar = ({ year, month, attendances = {} }: CalendarProps) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const calendarDays = buildCalendarDays(year, month);
  const { year: todayYear, month: todayMonth, day: todayDay } = getTodayParts();

  const getLevelForDay = (day: number): number | null => {
    const dateKey = formatDateKey(year, month, day);
    const usageMinutes = attendances[dateKey];

    if (
      usageMinutes === undefined ||
      usageMinutes === null ||
      usageMinutes === 0
    ) {
      return null;
    }

    return getLevelFromHours(usageMinutes / 60);
  };

  return (
    <div className="h-[150px] w-full">
      <div className="text-grey-400 text-caption-2xs-medium grid grid-cols-7 gap-x-1 text-center">
        {days.map((day, i) => (
          <div key={day} className={i === 0 ? 'text-point-red' : undefined}>
            {day}
          </div>
        ))}
      </div>

      <div className="mt-[5px] grid h-full grid-cols-7 gap-x-1 gap-y-1 text-center">
        {calendarDays.map((day, index) => (
          <div key={index} className="flex items-center justify-center">
            {day !== null && (
              <Circle
                level={getLevelForDay(day)}
                today={
                  year === todayYear && month === todayMonth && day === todayDay
                }
                future={isFutureDay(year, month, day)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
