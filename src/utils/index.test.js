const { calculatePercentage, roundNumber, minMax } = require('.');

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
    expect(result).toBe(0.23);
  });
  it('0.023 rounded to 0.03', () => {
    const result = roundNumber(0.023);
    console.log({ result });
    expect(result).toBe(0.03);
  });
  it('0.23 -> max 1, min 0 =  0.23', () => {
    const result = minMax(0.23, 1, 0);
    expect(result).toBe(0.23);
  });
  it('1 -> max 1, min 1 = 1', () => {
    const result = minMax(1, 1, 1);
    expect(result).toBe(1);
  });
  it('0 -> max 1.3 , min 0.3 = 0.3', () => {
    const result = minMax(0, 1.3, 0.3);
    expect(result).toBe(0.3);
  });
  it('1.5 -> max 1 , min 0.3 = 1', () => {
    const result = minMax(1.5, 1, 0.3);
    expect(result).toBe(1);
  });
});
