export const getTodayParts = (baseDate: Date = new Date()) => {
  return {
    year: baseDate.getFullYear(),
    month: baseDate.getMonth(),
    day: baseDate.getDate(),
  };
};
