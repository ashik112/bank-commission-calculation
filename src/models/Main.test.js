// const { Sequelize } = require('../db');
const Main = require('./Main');

describe('Tests for Main class', () => {
  /* beforeEach(async () => {
    consoleSpy.mockClear();
    mockStdIn.reset();
  }); */
  test('Main object can be created', () => {
    const cli = new Main();
    expect(cli).toBeDefined();
  });
});
