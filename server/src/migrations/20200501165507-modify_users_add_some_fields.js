'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'yearsInSchool', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'verificationCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'yearsInSchool'),
      queryInterface.removeColumn('Users', 'verificationCode'),
    ]);
  },
};
