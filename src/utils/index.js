function minMax(amount, max, min) {
  let value = amount;
  if (value < min) {
    value = min;
  } else if (value > max) {
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
