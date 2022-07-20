const constants = require('../constants');
const db = require('../db');
const { getWeekRange } = require('../utils/date');
const DB = require('./DB');
const LegalUser = require('./users/LegalUser');
const NaturalUser = require('./users/NaturalUser');

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
    getWeekRange(this.date);
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
      date: this.date,
      user_id: this.userId,
      user_type: this.userType,
      type: this.type,
      amount: this.operation.amount,
      currency: this.operation.currency,
    });
    // console.log({ res });
  }

  /**
   *
   * @returns
   */
  setUser() {
    switch (this.userType) {
      case constants.USER_TYPES.juridical:
        this.user = new LegalUser({
          userId: this.userId,
          userType: this.userType,
        });
        break;
      case constants.USER_TYPES.natural:
      default:
        this.user = new NaturalUser({
          userId: this.userId,
          userType: this.userType,
        });
        break;
    }
  }

  /**
   *
   * @returns
   */
  getCommissionFee() {
    switch (this.type) {
      case constants.TRANSACTION_TYPE.cash_in: {
        return this.user.getCashInCommissionFee(this.operation.amount);
      }
      case constants.TRANSACTION_TYPE.cash_out: {
        return this.user.getCashOutCommissionFee(this.operation.amount);
      }
      default:
        return 0;
    }
  }
}

Transaction.fetchAllEntries = async () => {
  const row = await DB.findAll(db.Transactions);
  return row;
};

module.exports = Transaction;
