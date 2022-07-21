function minMax(amount, max, min) {
  let value = amount;
  if (min && value < min) {
    value = min;
  }
  if (max && value > max) {
    value = max;
  }
  return value;
}

function calculatePercentage(value, percentage) {
  return (percentage / 100) * value;
}

function roundNumber(number) {
  return Math.ceil(number * 100) / 100;
}

module.exports = {
  minMax,
  calculatePercentage,
  roundNumber,
};
