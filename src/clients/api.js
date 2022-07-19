const axios = require('axios').default;

const BASE_URL = 'http://private-38e18c-uzduotis.apiary-mock.com/config';

async function fetchCashInConfiguration() {
  try {
    const response = await axios.get(`${BASE_URL}/cash-in`);
    return response.data;
  } catch (e) {
    return {};
  }
}

async function fetchCashOutConfiguration(userType) {
  try {
    const response = await axios.get(`${BASE_URL}/cash-out/${userType}`);
    return response.data;
  } catch (e) {
    return {};
  }
}

module.exports = {
  fetchCashInConfiguration,
  fetchCashOutConfiguration,
};
