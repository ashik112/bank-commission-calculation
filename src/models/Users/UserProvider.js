const USER_TYPES = require('../../constants');

/**
 *
 */
class UserProvider {
  getUserInstance(params) {
    const { user_type: userType } = params;
    switch (userType) {
      case USER_TYPES.juridical:
        return 'legal';
      case USER_TYPES.natural:
      default:
        return 'normal';
    }
  }
}

module.exports = UserProvider;
