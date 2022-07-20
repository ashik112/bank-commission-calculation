const { USER_TYPES } = require('../../constants');
const Configuration = require('../Configuration');

/**
 *
 */
class User {
  constructor(params) {
    this.userId = params.userId;
    this.userType = params.userType;
  }

  /**
   *
   * @param {*} params
   */
  getCashInCommissionFee(amount) {
    const config = Configuration.getCashInByUserType(USER_TYPES.natural);
    const percentage = config.percents;
    const minAmount = config.min ? config.min.amount : 0;
    const maxAmount = config.max ? config.max.amount : amount;
    let fee = (percentage / 100) * amount;
    if (fee < minAmount) {
      fee = minAmount;
    } else if (fee > maxAmount) {
      fee = maxAmount;
    }
    return fee.toFixed(2);
  }

  /**
   *
   * @param {*} params
   * @returns
   */
  getCashOutCommissionFee() {}
}
module.exports = User;
