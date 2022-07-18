const fs = require('fs');
const Transaction = require('./Transaction');

class Main {
  run() {
    console.log(process.argv);
    const myArgs = process.argv.slice(2);
    const inputJsonFilePath = myArgs[0];
    console.log({ inputJsonFilePath });
    const transactions = this.getJsonData(inputJsonFilePath);
    /* console.log({
      transactions,
    }); */
    transactions.forEach((element, index) => {
      console.log(`${index}-------------`);
      //   console.log({ element });
      const transaction = new Transaction(element);
      console.log(transaction.getCommissionFee());
    });
  }

  getJsonData(path) {
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  }
}

module.exports = Main;
