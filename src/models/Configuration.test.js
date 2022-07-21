const axios = require('axios').default;

// eslint-disable-next-line
const MockAdapter = require('axios-mock-adapter');
const { USER_TYPES, TRANSACTION_TYPE } = require('../constants');
const { BASE_URL } = require('../clients/api');
const Configuration = require('./Configuration');

const mock = new MockAdapter(axios);

// eslint-disable-next-line
mock.onGet(`${BASE_URL}/cash-out/natural`).reply(200, {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
});

// eslint-disable-next-line
mock.onGet(`${BASE_URL}/cash-out/juridical`).reply(200, {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: 'EUR',
  },
});

// eslint-disable-next-line
mock.onGet(`${BASE_URL}/cash-in`).reply(200, {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
});

describe('tests for Configuration class', () => {
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
    console.log(Configuration.cashOut);
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
