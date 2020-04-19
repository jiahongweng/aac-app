module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  User.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return User;
};
