const Sequelize = require('sequelize');
const SQLite = require('sqlite3');
const dbConfig = require('./db.config');
const Transactions = require('./transaction.model');

const sequelize = new Sequelize(
  dbConfig.database_name,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    dialectOptions: {
      // Your sqlite3 options here
      // for instance, this is how you can configure the database opening mode:
      mode: SQLite.OPEN_READWRITE,
    },
    logging: false,
  }
);

const db = {};
db.Transactions = Transactions(sequelize, Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
