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
    // console.log(process.argv);
    // console.log(Configuration);
    // console.log(Configuration.getCashOut());
    // console.log(Configuration.getCashIn());
    // console.log(fetchCashInConfiguration());
    const myArgs = process.argv.slice(2);
    const inputJsonFilePath = myArgs[0];
    // console.log({ inputJsonFilePath });
    const transactions = this.getJsonData(inputJsonFilePath);
    await Promise.all(
      transactions.map(async (element, index) => {
        const transaction = new Transaction(element);
        await transaction.init();
        // console.log(await Transaction.fetchAllEntries());
        console.log(index + 1, ' : ', transaction.getCommissionFee());
      })
    );
    // console.log(await Transaction.fetchAllEntries());
  }

  getJsonData(path) {
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  }
}

module.exports = Main;
