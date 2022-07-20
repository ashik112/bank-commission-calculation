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

    /* console.log({
      start: startDate.toUTCString(),
      currentDate: new Date(date).toUTCString(),
      end: new Date(date).toUTCString(),
    }); */
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
}

module.exports = User;
