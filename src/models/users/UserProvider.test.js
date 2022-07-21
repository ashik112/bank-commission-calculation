const { USER_TYPES } = require('../../constants');
const UserProvider = require('./UserProvider');

describe('tests for UserProvider class', () => {
  it('object for UserProvider class can be accessed', () => {
    expect(UserProvider).toBeDefined();
  });
  it('can get legal user object from user type', () => {
    expect(UserProvider.getUserInstance(USER_TYPES.juridical)).toBeDefined();
  });
  it('can get natural user object from user type', () => {
    expect(UserProvider.getUserInstance(USER_TYPES.natural)).toBeDefined();
  });
  it('will return NaturalUser object if no type if given', () => {
    const user = UserProvider.getUserInstance();
    expect(user.userType).toBe(USER_TYPES.natural);
  });
});
