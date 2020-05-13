'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      styleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      styleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      styleImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brandName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brandImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  },
};
