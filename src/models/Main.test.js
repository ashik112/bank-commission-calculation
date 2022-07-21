const Main = require('./Main');
const dummyTransactionList = require('../../data/input.json');
const db = require('../db');

const initializeProcessArgs = () => {
  process.argv.push('data/input.json');
};
const resetProcessArgs = () => {
  process.argv.pop();
};

describe('tests for Main class', () => {
  it('main object can be created', () => {
    initializeProcessArgs();
    const cli = new Main();
    expect(cli).toBeDefined();
    resetProcessArgs();
  });

  it('input file path can be read from the arguments', () => {
    initializeProcessArgs();
    const cli = new Main();
    cli.getInputFilePath();
    expect(cli.getInputFilePath()).toBe('data/input.json');
    resetProcessArgs();
  });

  it('json data can be loaded from the input path', () => {
    initializeProcessArgs();
    const cli = new Main();
    const path = cli.getInputFilePath();
    const jsonData = cli.getJsonData(path);
    expect(jsonData).toStrictEqual(dummyTransactionList);
    resetProcessArgs();
  });

  it('print outputs in correct format', () => {
    const logSpy = jest.spyOn(console, 'log');
    const cli = new Main();
    cli.printResult([0.06, 0.9, 87, 3, 0.3, 0.3, 5, 0, 0]);
    expect(logSpy).toHaveBeenCalledWith(
      '0.06\n0.90\n87.00\n3.00\n0.30\n0.30\n5.00\n0.00\n0.00'
    );
  });

  it('print empty string if output is empty', () => {
    const logSpy = jest.spyOn(console, 'log');
    const cli = new Main();
    cli.printResult([]);
    expect(logSpy).toHaveBeenCalledWith('');
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  it('prints expected output', async () => {
    db.sequelize.sync({ force: true });
    const logSpy = jest.spyOn(console, 'log');
    initializeProcessArgs();
    const cli = new Main();
    await cli.run();
    expect(logSpy).toHaveBeenCalledWith(
      '0.06\n0.90\n87.00\n3.00\n0.30\n0.30\n5.00\n0.00\n0.00'
    );
  });
});
