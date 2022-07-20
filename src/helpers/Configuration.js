const {
  fetchCashInConfiguration,
  fetchCashOutConfiguration,
} = require('../clients/api');
const { USER_TYPES } = require('../constants');

class Configuration {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    if (Configuration._instance) {
      // eslint-disable-next-line no-underscore-dangle, no-constructor-return
      return Configuration._instance;
      //   throw new Error("Configuration  can't be instantiated more than once.");
    }
    // eslint-disable-next-line no-underscore-dangle
    Configuration._instance = this;
  }

  async init() {
    await this.setCashOut();
    await this.setCashIn();
  }

  async setCashIn() {
    const data = await fetchCashInConfiguration();
    Object.keys(USER_TYPES).forEach((key) => {
      let config = this.cashIn || {};
      config = {
        ...config,
        [USER_TYPES[key]]: data,
      };
      this.cashIn = config;
    });
  }

  async setCashOut() {
    await Promise.all(
      Object.keys(USER_TYPES).map(async (key) => {
        const data = await fetchCashOutConfiguration(USER_TYPES[key]);
        let config = this.cashOut || {};
        config = {
          ...config,
          [USER_TYPES[key]]: data,
        };
        this.cashOut = config;
      })
    );
  }

  getCashOut() {
    return this.cashOut;
  }

  getCashIn() {
    return this.cashIn;
  }

  getCashOutByUserType(userType) {
    // console.log(this.cashOut);
    return this.cashOut[userType];
  }

  getCashInByUserType(userType) {
    return this.cashIn[userType];
  }
}

module.exports = new Configuration();
