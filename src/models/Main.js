const fs = require('fs');
// const { fetchCashInConfiguration } = require('../clients/api');
// const { USER_TYPES } = require('../constants');
const Configuration = require('./Configuration');
const Transaction = require('./Transaction');

class Main {
  /**
   *
   */
  async run() {
    await Configuration.init();
    const myArgs = process.argv.slice(2);
    const inputJsonFilePath = myArgs[0];
    const transactions = this.getJsonData(inputJsonFilePath);
    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const transactionInstance = new Transaction(transaction);
      // eslint-disable-next-line no-await-in-loop
      await transactionInstance.init();
      // eslint-disable-next-line no-await-in-loop
      const fee = (await transactionInstance.getCommissionFee()).toFixed(2);
      console.log(fee);
    }
  }

  getJsonData(path) {
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  }
}

module.exports = Main;
