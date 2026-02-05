import { useAttendanceSuspenseQuery } from '@entities/dashboard';
import { useState } from 'react';
import AttendancePanelPresenter from './AttendancePanelPresenter';
import { getSubContentMessage } from './utils/getSubContentMessage';

const AttendancePanel = () => {
  // 오늘 월(1일)로 정규화
  const today = new Date();
  const todayYm = new Date(today.getFullYear(), today.getMonth(), 1);

  const [viewDate, setViewDate] = useState<Date>(todayYm);
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth(); // 0~11

  // API 호출
  const { data: attendanceData } = useAttendanceSuspenseQuery({
    period: 'MONTHLY',
    year: viewYear,
    month: viewMonth + 1, // API는 1~12월 사용
  });

  const clampToTodayMonth = (d: Date) => {
    const y = d.getFullYear();
    const m = d.getMonth();
    const ty = todayYm.getFullYear();
    const tm = todayYm.getMonth();
    if (y > ty || (y === ty && m > tm)) return todayYm; // 미래 달로 못감
    return d;
  };

  const addMonthsSafe = (base: Date, delta: number) =>
    clampToTodayMonth(new Date(base.getFullYear(), base.getMonth() + delta, 1));

  const isAtCurrentMonth =
    viewYear === todayYm.getFullYear() && viewMonth === todayYm.getMonth();

  const title = attendanceData.data.title || '잘하고 있어요!';
  const content1 = attendanceData.data.content1;
  const content2 = attendanceData.data.content2;
  const subContentMessage = getSubContentMessage(attendanceData.data.subContent);

  return (
    <AttendancePanelPresenter
      viewYear={viewYear}
      viewMonth={viewMonth}
      isAtCurrentMonth={isAtCurrentMonth}
      onPrevMonth={() => setViewDate((d) => addMonthsSafe(d, -1))}
      onNextMonth={() => setViewDate((d) => addMonthsSafe(d, +1))}
      attendances={attendanceData.data.attendances}
      title={title}
      content1={content1}
      content2={content2}
      subContentMessage={subContentMessage}
    />
  );
};

export default AttendancePanel;