module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('transactions', {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return User;
};
