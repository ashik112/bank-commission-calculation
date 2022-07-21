// const { Sequelize } = require('../db');
const Main = require('./Main');
const dummyTransactionList = require('../../data/input.json');

process.argv.push('data/input.json');

describe('tests for Main class', () => {
  /* beforeEach(async () => {
    consoleSpy.mockClear();
    mockStdIn.reset();
  }); */
  it('main object can be created', () => {
    const cli = new Main();
    expect(cli).toBeDefined();
  });

  it('input File Path can be read from the arguments', () => {
    const cli = new Main();
    cli.getInputFilePath();
    expect(cli.getInputFilePath()).toBe('data/input.json');
  });

  it('json data can be loaded from the input path', () => {
    const cli = new Main();
    const path = cli.getInputFilePath();
    const jsonData = cli.getJsonData(path);
    expect(jsonData).toStrictEqual(dummyTransactionList);
  });
});
