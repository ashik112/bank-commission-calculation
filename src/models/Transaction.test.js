const { USER_TYPES, TRANSACTION_TYPE } = require('../constants');
const Transaction = require('./Transaction');
const axiosMock = require('../../tests/axios.mock');
const db = require('../db');
const Configuration = require('./Configuration');

const DUMMY_TRANSACTION_LIST = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: { amount: 1000000.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 3,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
];

describe('tests for Transaction class', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    axiosMock.restore();
    await db.sequelize.sync({ force: true });
    // await db.Transactions.bulkCreate(DUMMY_TRANSACTION_LIST);
    await Configuration.init();
  });
  // eslint-disable-next-line jest/no-hooks
  afterAll(async () => {
    axiosMock.reset();
    await db.sequelize.sync({ force: true, drop: true });
  });

  it('transaction object can be created', () => {
    const transaction = new Transaction({
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: { amount: 200.0, currency: 'EUR' },
    });
    expect(transaction).toBeDefined();
  });
});
