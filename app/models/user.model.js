module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    uname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    }
  });

  return User;
};
