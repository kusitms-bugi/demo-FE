export const isFutureDay = (year: number, month: number, day: number) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  if (year > todayYear) return true;
  if (year === todayYear && month > todayMonth) return true;
  if (year === todayYear && month === todayMonth && day > todayDate) return true;
  return false;
};
