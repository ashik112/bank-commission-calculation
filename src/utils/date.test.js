const { getFirsDayOfWeek } = require('./date');

describe('test cases for date util', () => {
  it('can get the first day of the week (Monday) from a given date', () => {
    const monday = getFirsDayOfWeek('2022-07-22');
    expect(monday).toStrictEqual(new Date('2022-07-18'));
  });
  it('can get the first day of the week (Monday) of previous month from a given date', () => {
    const monday = getFirsDayOfWeek('2022-06-05');
    expect(monday).toStrictEqual(new Date('2022-05-30'));
  });
  it('can get the first day of the week (Monday) of previous year from a given date', () => {
    const monday = getFirsDayOfWeek('2022-01-01');
    expect(monday).toStrictEqual(new Date('2021-12-27'));
  });
});
