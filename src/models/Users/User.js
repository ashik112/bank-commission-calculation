/* eslint-disable max-classes-per-file */

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
  getCashInCommissionFee(params) {
    console.log('natural');
  }

  /**
   *
   * @param {*} params
   * @returns
   */
  getCashOutCommissionFee(params) {
    console.log('natural');
    return 0;
  }
}

class NaturalUser extends User {
  getCashOutCommissionFee(params) {
    console.log('natural');
    return 0;
  }
}

class LegalUser extends User {
  getCashOutCommissionFee(params) {
    console.log('judicial');
    return 0;
  }
}

module.exports = { NaturalUser, LegalUser };
