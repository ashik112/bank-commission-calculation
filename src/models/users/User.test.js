const { USER_TYPES, TRANSACTION_TYPE } = require('../../constants');
const User = require('./User');
const axiosMock = require('../../../tests/axios.mock');
const db = require('../../db');

describe('tests for User class', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    axiosMock.restore();
    await db.sequelize.sync({ force: true });
    await db.Transactions.bulkCreate([
      {
        date: new Date('2016-01-05'),
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        amount: 200.0,
        currency: 'EUR',
      },
      {
        date: new Date('2016-01-06'),
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        amount: 300.0,
        currency: 'EUR',
      },
      {
        date: new Date('2016-01-06'),
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        amount: 300.0,
        currency: 'EUR',
      },
      {
        date: new Date('2016-01-06'),
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        amount: 300.0,
        currency: 'EUR',
      },
    ]);
  });
  // eslint-disable-next-line jest/no-hooks
  afterAll(async () => {
    axiosMock.reset();
    await db.sequelize.sync({ force: true, drop: true });
  });

  it('user object can be created', () => {
    const user = new User({ userId: 1, userType: USER_TYPES.natural });
    expect(user).toBeDefined();
  });

  it('can get total weekly transaction amount for a user', async () => {
    const user = new User({ userId: 1, userType: USER_TYPES.natural });
    const result = await user.getWeeklyTransactionAmount(
      new Date('2016-01-06'),
      TRANSACTION_TYPE.cash_out
    );
    console.log({ result });
    expect(result).toBe(800);
  });
});
