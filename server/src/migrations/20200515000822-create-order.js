'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
        onDelete: 'CASCADE',
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'id',
          as: 'organizationId',
        },
        onDelete: 'CASCADE',
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      note: {
        type: Sequelize.TEXT
      },
      styleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'styleId',
        },
        onDelete: 'CASCADE',
      },
      designs: {
        type: Sequelize.JSONB
      },
      products: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 3,
        },
        comment: '0: Created, 1: Purcahse Phase, 2: Pre-Production, 3: Production',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};