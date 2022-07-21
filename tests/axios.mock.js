const axios = require('axios').default;
// eslint-disable-next-line
const MockAdapter = require('axios-mock-adapter');
const { BASE_URL } = require('../src/clients/api');

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

module.exports = mock;
