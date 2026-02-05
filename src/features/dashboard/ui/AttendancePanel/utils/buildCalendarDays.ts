export const buildCalendarDays = (
  year: number,
  month: number, // 0~11
): (number | null)[] => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 7의 배수 칸으로 맞추기 (마지막 주 패딩)
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const trailing = totalCells - (firstDayOfMonth + daysInMonth);

  return [
    ...(Array(firstDayOfMonth).fill(null) as (number | null)[]),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...(Array(trailing).fill(null) as (number | null)[]),
  ];
};
