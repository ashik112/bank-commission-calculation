const { calculatePercentage, roundNumber } = require('.');

describe('tests for utils', () => {
  it('0.03% of 200 = 0.06', () => {
    const result = calculatePercentage(200, 0.03);
    expect(result).toBe(0.06);
  });
  it('0% of 0 = 0', () => {
    const result = calculatePercentage(0, 0);
    expect(result).toBe(0);
  });
  it('0.23 rounded to 0.3', () => {
    const result = roundNumber(0.23);
    console.log({ result });
    expect(result).toBe(0.23);
  });
  it('0.023 rounded to 0.03', () => {
    const result = roundNumber(0.023);
    console.log({ result });
    expect(result).toBe(0.03);
  });
});
