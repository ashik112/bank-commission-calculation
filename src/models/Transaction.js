const constants = require('../constants');
const LegalUser = require('./Users/LegalUser');
const NaturalUser = require('./Users/NaturalUser');

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
    this.setUser();
  }

  /**
   *
   * @returns
   */
  getUser() {
    return this.user;
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

module.exports = Transaction;
