const db = require('../db');
const DB = require('./DB');

const initializeDatabase = async () => {
  await db.sequelize.sync({ force: true });
};

const isDatabaseConnected = async () => {
  try {
    await db.sequelize.authenticate();
    return true;
  } catch (e) {
    return false;
  }
};

describe('tests for database', () => {
  it('database is properly initiated', async () => {
    await initializeDatabase();
    const connected = await isDatabaseConnected();
    expect(connected).toBe(true);
  });
});

describe('tests for DB class', () => {
  it('object for DB is defined', () => {
    expect(DB).toBeDefined();
  });
  it('data can be inserted in database', async () => {
    const data = await DB.insert(db.Transactions, {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      amount: 200.0,
      currency: 'EUR',
    });
    expect(data).toBeDefined();
    expect(data.id).toBe(1);
  });
  it('data can be fetched from database', async () => {
    const data = await DB.findAll(db.Transactions);
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
    await db.sequelize.sync({ force: true, drop: true });
  });
});
