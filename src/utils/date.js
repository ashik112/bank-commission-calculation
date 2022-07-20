function getWeekRange(date) {
  const curr = new Date(date); // get current date
  const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week + 1 (Monday)
  const last = first + 6; // last day is the first day + 6 (Sunday)

  const firstDay = new Date(curr.setDate(first));
  const lastDay = new Date(curr.setDate(last));
  return {
    first: firstDay,
    last: lastDay,
  };
}

module.exports = {
  getWeekRange,
};
