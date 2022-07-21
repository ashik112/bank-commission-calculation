const USER_TYPES = require('../../constants');
const LegalUser = require('./LegalUser');
const NaturalUser = require('./NaturalUser');

/**
 *
 */
class UserProvider {
  /**
   * Checks for userType and returns User Object
   * @param {*} params
   * @returns User
   */
  getUserInstance(params) {
    switch (params.userType) {
      case USER_TYPES.juridical:
        return new LegalUser(params);
      case USER_TYPES.natural:
      default:
        return new NaturalUser(params);
    }
  }
}

module.exports = new UserProvider();
