// const axios = require('axios').default;

// eslint-disable-next-line
// const MockAdapter = require('axios-mock-adapter');
const { USER_TYPES, TRANSACTION_TYPE } = require('../constants');
// const { BASE_URL } = require('../clients/api');
const Configuration = require('./Configuration');
const axiosMock = require('../../tests/axios.mock');
const db = require('../db');

describe('tests for Configuration class', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    axiosMock.restore();
    await db.sequelize.sync({ force: true });
  });
  // eslint-disable-next-line jest/no-hooks
  afterAll(async () => {
    axiosMock.reset();
    await db.sequelize.sync({ force: true });
  });
  it('configuration object is defined', () => {
    expect(Configuration).toBeDefined();
  });
  it('cash in config can be set', async () => {
    await Configuration.setCashIn();
    expect(Configuration.cashIn).toStrictEqual({
      juridical: { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
      natural: { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
    });
  });
  it('cash out config can be set', async () => {
    await Configuration.setCashOut();
    expect(Configuration.cashOut).toStrictEqual({
      juridical: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } },
      natural: { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } },
    });
  });
  it('can get cash out config by user and transaction type', async () => {
    expect(
      Configuration.getTransactionConfig(
        USER_TYPES.natural,
        TRANSACTION_TYPE.cash_out
      )
    ).toStrictEqual({
      percents: 0.3,
      week_limit: { amount: 1000, currency: 'EUR' },
    });
    expect(
      Configuration.getTransactionConfig(
        USER_TYPES.juridical,
        TRANSACTION_TYPE.cash_out
      )
    ).toStrictEqual({ percents: 0.3, min: { amount: 0.5, currency: 'EUR' } });
  });
  it('can get cash in config by user and transaction type', async () => {
    expect(
      Configuration.getTransactionConfig(
        USER_TYPES.natural,
        TRANSACTION_TYPE.cash_in
      )
    ).toStrictEqual({ percents: 0.03, max: { amount: 5, currency: 'EUR' } });
    expect(
      Configuration.getTransactionConfig(
        USER_TYPES.juridical,
        TRANSACTION_TYPE.cash_in
      )
    ).toStrictEqual({ percents: 0.03, max: { amount: 5, currency: 'EUR' } });
  });
});
