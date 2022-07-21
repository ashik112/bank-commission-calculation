const fs = require('fs');
const { roundNumber } = require('../utils');
// const { fetchCashInConfiguration } = require('../clients/api');
// const { USER_TYPES } = require('../constants');
const Configuration = require('./Configuration');
const Transaction = require('./Transaction');

class Main {
  /**
   * Runs the application
   */
  async run() {
    const myArgs = process.argv.slice(2);
    const inputJsonFilePath = myArgs[0];
    if (!inputJsonFilePath) {
      console.log('Please enter the path of the json file');
      return;
    }

    await Configuration.init();
    const transactions = this.getJsonData(inputJsonFilePath);
    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const transactionInstance = new Transaction(transaction);
      // eslint-disable-next-line no-await-in-loop
      await transactionInstance.init();
      // eslint-disable-next-line no-await-in-loop
      let commission = await transactionInstance.getCommissionFee();
      commission = roundNumber(commission);
      this.printCommission(commission);
    }
  }

  printCommission(commission) {
    console.log(commission.toFixed(2));
  }

  getJsonData(path) {
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  }
}

module.exports = Main;
