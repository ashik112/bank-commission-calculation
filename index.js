require('dotenv').config();
const db = require('./src/db');
require('./src/app');

// db.sequelize.sync(); // enable in production mode
// create all the defined tables in the specified database. ! { force: true } will drop tables
db.sequelize
  .sync({ force: false, alter: true, drop: true })
  .then(() => {
    console.log('re-sync database.');
  })
  .catch((error) => {
    console.log('error: ', error);
  });
