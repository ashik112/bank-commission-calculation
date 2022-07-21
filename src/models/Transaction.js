// const constants = require('../constants');
const db = require('../db');
const { calculatePercentage, minMax } = require('../utils');
const Configuration = require('./Configuration');
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
   * @returns User
   */
  getUser() {
    return this.user;
  }

  /**
   * Insert transaction details in transaction history in database
   */
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
   * @returns Commission Fee
   */
  async getCommissionFee() {
    let fee = 0;
    fee = await this.calculateCommissionFee();
    return fee;
  }

  /**
   * Returns 0 if commission is 0 else returns calculable amount before the final calculation
   * @param {*} weeklyTotalAmount
   * @param {*} config
   * @returns 0 | calculableAmount
   */
  handleTransactionWeeklyLimit(weeklyTotalAmount, config) {
    const { amount } = this.operation;
    if (config && config.week_limit && config.week_limit.amount) {
      const weeklyLimit = config.week_limit.amount;
      if (weeklyTotalAmount === 0 && amount <= weeklyLimit) return 0;
      if (weeklyTotalAmount <= weeklyLimit) return 0;
      if (weeklyTotalAmount === amount) {
        if (weeklyTotalAmount > weeklyLimit) {
          return amount - weeklyLimit;
        }
      }
      if (weeklyTotalAmount - amount > weeklyLimit) {
        return amount;
      }
      if (weeklyTotalAmount + amount > weeklyLimit) {
        return weeklyTotalAmount + amount - weeklyLimit;
      }
      return 0;
    }
    return null;
  }

  /**
   * Do the final commission calculation after handling other factors
   * @param {*} amount
   * @param {*} config
   * @returns
   */
  commissionFinalCalculation(amount, config) {
    const percentage = config.percents;
    const minAmount = config.min ? config.min.amount : 0;
    const maxAmount = config.max ? config.max.amount : amount;
    let fee = calculatePercentage(amount, percentage);
    fee = minMax(fee, maxAmount, minAmount);
    return fee;
  }

  /**
   * Calculate Commission
   * @returns commission
   */
  async calculateCommissionFee() {
    const { amount } = this.operation;
    let calculableAmount = amount;
    const config = Configuration.getTransactionConfig(
      this.user.userType,
      this.type
    );
    if (!config) return 0;
    if (config.week_limit) {
      let weeklyTotalAmount = await this.user.getWeeklyTransactionAmount(
        this.date,
        this.type
      );
      weeklyTotalAmount = weeklyTotalAmount || amount;
      const res = this.handleTransactionWeeklyLimit(weeklyTotalAmount, config);
      if (res !== null) {
        if (res === 0) return 0;
        calculableAmount = res;
      }
    }
    return this.commissionFinalCalculation(calculableAmount, config);
  }
}

/**
 * Fetch all transactions from database
 * @returns transactions[]
 */
Transaction.fetchAllEntries = async () => {
  const row = await DB.findAll(db.Transactions);
  return row;
};

module.exports = Transaction;
