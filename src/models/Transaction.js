const constants = require('../constants');
const db = require('../db');
const DB = require('./DB');
const UserProvider = require('./users/UserProvider');

class Transaction {
  constructor(params) {
    const {
      date,
      user_id: userId,
      user_type: userType,
      type,
      operation,
    } = params;
    this.date = date;
    this.userId = userId;
    this.userType = userType;
    this.type = type;
    this.operation = operation;
    this.dbInstance = db.Transactions;
    this.setUser();
  }

  async init() {
    await this.store();
  }

  /**
   *
   * @returns
   */
  getUser() {
    return this.user;
  }

  async store() {
    await DB.insert(this.dbInstance, {
      date: new Date(this.date),
      user_id: this.userId,
      user_type: this.userType,
      type: this.type,
      amount: this.operation.amount,
      currency: this.operation.currency,
    });
  }

  /**
   *
   * @returns
   */
  setUser() {
    this.user = UserProvider.getUserInstance({
      userId: this.userId,
      userType: this.userType,
    });
  }

  /**
   *
   * @returns
   */
  async getCommissionFee() {
    let fee = 0;
    switch (this.type) {
      case constants.TRANSACTION_TYPE.cash_in:
        fee = await this.getCashInCommissionFee();
        break;
      case constants.TRANSACTION_TYPE.cash_out:
        fee = await this.getCashOutCommissionFee();
        break;
      default:
        break;
    }
    return fee;
  }

  /**
   *
   * @param {*} params
   */
  async getCashInCommissionFee() {
    const { amount } = this.operation;
    const config = await this.user.getCashInConfig();
    const percentage = config.percents;
    const minAmount = config.min ? config.min.amount : 0;
    const maxAmount = config.max ? config.max.amount : amount;
    let fee = (percentage / 100) * amount;
    if (fee < minAmount) {
      fee = minAmount;
    } else if (fee > maxAmount) {
      fee = maxAmount;
    }
    return fee;
  }

  /**
   *
   * @param {*} params
   * @returns
   */

  async getCashOutCommissionFee() {
    const { amount } = this.operation;
    let calculableAmount = amount;
    const config = await this.user.getCashOutConfig();
    if (config.week_limit && config.week_limit.amount) {
      /* console.log(
        'user id: ',
        this.userId,
        'type: ',
        this.type,
        'date: ',
        new Date(this.date),
        'amount: ',
        this.operation.amount
      ); */
      const weeklyLimit = config.week_limit.amount;
      let weeklyTotalAmount = 0;
      const weeklyAmountArr = await this.user.getWeeklyTransactionAmount(
        this.date,
        'cash_out'
      );
      weeklyTotalAmount =
        weeklyAmountArr.length > 0 && weeklyAmountArr[0].weekly_amount
          ? weeklyAmountArr[0].weekly_amount
          : this.amount;
      if (weeklyTotalAmount <= weeklyLimit) {
        return 0;
      }
      if (weeklyTotalAmount > 0) {
        if (weeklyTotalAmount === amount) {
          // first transaction of the week
          if (amount <= weeklyLimit) {
            return 0;
          }
          if (amount > weeklyLimit) {
            calculableAmount = amount - weeklyLimit;
          }
        } else if (weeklyTotalAmount - amount > weeklyLimit) {
          calculableAmount = amount;
        } else if (weeklyTotalAmount + amount > weeklyLimit) {
          calculableAmount = weeklyTotalAmount + amount - weeklyLimit;
        } else {
          return 0;
        }
      }
    }
    const percentage = config.percents;
    const minAmount = config.min ? config.min.amount : 0;
    const maxAmount = config.max ? config.max.amount : calculableAmount;
    let fee = (percentage / 100) * calculableAmount;
    if (fee < minAmount) {
      fee = minAmount;
    } else if (fee > maxAmount) {
      fee = maxAmount;
    }
    return fee;
  }
}

Transaction.fetchAllEntries = async () => {
  const row = await DB.findAll(db.Transactions);
  return row;
};

module.exports = Transaction;
