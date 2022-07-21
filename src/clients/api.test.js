const axios = require('axios').default;
const MockAdapter = require('axios-mock-adapter');
const { USER_TYPES } = require('../constants');
const {
  fetchCashOutConfiguration,
  BASE_URL,
  fetchCashInConfiguration,
} = require('./api');

const mock = new MockAdapter(axios);

mock.onGet(`${BASE_URL}/cash-out/natural`).reply(200, {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
});

mock.onGet(`${BASE_URL}/cash-out/juridical`).reply(200, {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: 'EUR',
  },
});

mock.onGet(`${BASE_URL}/cash-in`).reply(200, {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
});

describe('tests for api clients', () => {
  it('fetches cash out config for natural persons', async () => {
    const result = await fetchCashOutConfiguration(USER_TYPES.natural);
    expect(result).toStrictEqual({
      percents: 0.3,
      week_limit: {
        amount: 1000,
        currency: 'EUR',
      },
    });
  });

  it('fetches cash out config for legal persons', async () => {
    const result = await fetchCashOutConfiguration(USER_TYPES.juridical);
    expect(result).toStrictEqual({
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: 'EUR',
      },
    });
  });

  it('fetches cash in config (common for all persons)', async () => {
    const result = await fetchCashInConfiguration();
    expect(result).toStrictEqual({
      percents: 0.03,
      max: {
        amount: 5,
        currency: 'EUR',
      },
    });
  });
});
