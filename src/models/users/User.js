const { Op, fn, col } = require('sequelize');
const { USER_TYPES } = require('../../constants');
const db = require('../../db');
const { getFirsDayOfWeek } = require('../../utils/date');
const Configuration = require('../Configuration');
const DB = require('../DB');

/**
 *
 */
class User {
  constructor(params) {
    this.userId = (params && params.userId) || null;
    this.userType = (params && params.userType) || USER_TYPES.natural;
  }

  /**
   * Returns total transaction amount from first day of the week (Monday) to transaction date
   * @param {*} date
   * @param {*} transactionType ('cash_in' | 'cash_out')
   * @returns
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
      if (data && data.length > 0 && data[0].weekly_amount) {
        return data[0].weekly_amount;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getCashOutConfig() {
    const config = Configuration.getCashOutByUserType(this.userType);
    return config;
  }

  async getCashInConfig() {
    const config = Configuration.getCashInByUserType(this.userType);
    return config;
  }
}

module.exports = User;
