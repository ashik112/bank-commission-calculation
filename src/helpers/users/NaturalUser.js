const { USER_TYPES } = require('../../constants');
const Configuration = require('../Configuration');
const User = require('./User');

class NaturalUser extends User {
  getCashOutCommissionFee(amount) {
    const config = Configuration.getCashOutByUserType(USER_TYPES.natural);
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
}

module.exports = NaturalUser;
