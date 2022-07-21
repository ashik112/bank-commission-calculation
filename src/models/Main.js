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
    const inputJsonFilePath = this.getInputFilePath();
    if (!inputJsonFilePath) {
      console.log('Please enter the path of the json file');
      return;
    }

    await Configuration.init();
    const commissions = [];
    const transactions = this.getJsonData(inputJsonFilePath);
    for (let i = 0; i < transactions.length; i += 1) {
      const transaction = transactions[i];
      const transactionInstance = new Transaction(transaction);
      // eslint-disable-next-line no-await-in-loop
      await transactionInstance.init();
      // eslint-disable-next-line no-await-in-loop
      let commission = await transactionInstance.getCommissionFee();
      commission = roundNumber(commission);
      // this.printCommission(commission);
      commissions.push(commission);
    }
    this.printResult(commissions);
  }

  printResult(arr) {
    if (arr && arr.length > 0) {
      const commissions = arr.map((commission) => commission.toFixed(2));
      console.log(commissions.join('\n'));
    } else {
      console.log('');
    }
  }

  getInputFilePath() {
    const myArgs = process.argv.slice(2);
    return myArgs[0];
  }

  getJsonData(path) {
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  }
}

module.exports = Main;
