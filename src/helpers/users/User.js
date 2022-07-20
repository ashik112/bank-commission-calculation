const { Op, fn, col } = require('sequelize');
const db = require('../../db');
const { getFirsDayOfWeek } = require('../../utils/date');
const Configuration = require('../Configuration');
const DB = require('../DB');

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
   * @param {*} date
   * @param {*} type
   */
  async getWeeklyTransactionAmount(date, type) {
    const startDate = getFirsDayOfWeek(date);
    const option = {
      attributes: [[fn('sum', col('amount')), 'weekly_amount']],
      raw: true,
      group: ['user_id'],
      where: {
        user_id: this.userId,
        type,
        date: {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: new Date(date),
          },
        },
      },
    };
    try {
      const data = await DB.findAll(db.Transactions, option);
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getCashOutConfig() {
    const config = await Configuration.getCashOutByUserType(this.userType);
    return config;
  }

  async getCashInConfig() {
    const config = await Configuration.getCashInByUserType(this.userType);
    return config;
  }

  /**
   *
   * @param {*} params
   */
  async getCashInCommissionFee(amount) {
    const config = await this.getCashInConfig();
    const percentage = config.percents;
    const minAmount = config.min ? config.min.amount : 0;
    const maxAmount = config.max ? config.max.amount : amount;
    let fee = (percentage / 100) * amount;
    if (fee < minAmount) {
      fee = minAmount;
    } else if (fee > maxAmount) {
      fee = maxAmount;
    }
    return fee.toFixed(2) === '0' ? '0.00' : fee.toFixed(2);
  }

  /**
   *
   * @param {*} params
   * @returns
   */

  async getCashOutCommissionFee(amount, date) {
    let calculableAmount = amount;
    const config = await this.getCashOutConfig();
    if (config.week_limit && config.week_limit.amount) {
      const weeklyLimit = config.week_limit.amount;
      let weeklyTotalAmount = 0;
      const weeklyAmountArr = await this.getWeeklyTransactionAmount(
        date,
        'cash_out'
      );
      weeklyTotalAmount =
        weeklyAmountArr.length > 0 && weeklyAmountArr[0].weekly_amount
          ? weeklyAmountArr[0].weekly_amount
          : amount;
      if (weeklyTotalAmount <= weeklyLimit) {
        return '0.00';
      }
      if (weeklyTotalAmount > 0) {
        if (weeklyTotalAmount === amount) {
          // first transaction of the week
          if (amount <= weeklyLimit) {
            return '0.00';
          }
          if (amount > weeklyLimit) {
            calculableAmount = amount - weeklyLimit;
          }
        } else if (weeklyTotalAmount - amount > weeklyLimit) {
          calculableAmount = amount;
        } else if (weeklyTotalAmount + amount > weeklyLimit) {
          calculableAmount = weeklyTotalAmount + amount - weeklyLimit;
        } else {
          return '0.00';
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
    return fee.toFixed(2) === '0' ? '0.00' : fee.toFixed(2);
  }
}
module.exports = User;
