const constants = require('../constants');
const { NaturalUser, LegalUser } = require('./Users/User');

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
  }

  getUser() {
    switch (this.userType) {
      case constants.USER_TYPES.natural:
        return new NaturalUser({
          userId: this.userId,
          userType: this.userType,
        });
      case constants.USER_TYPES.juridical:
        return new LegalUser({
          userId: this.userId,
          userType: this.userType,
        });
      default:
        return new NaturalUser({
          userId: this.userId,
          userType: this.userType,
        });
    }
  }

  getCommissionFee() {
    const user = this.getUser();
    switch (this.type) {
      case constants.TRANSACTION_TYPE.cash_in: {
        return 0;
      }
      case constants.TRANSACTION_TYPE.cash_out: {
        return user.getCashOutCommissionFee(this.operation.amount);
      }
      default:
        return 0;
    }
  }
}

module.exports = Transaction;
