'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      },
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Organization',
        key: 'id',
        as: 'organizationId',
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
    },
    styleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'styleId',
      },
    },
    designs: {
      type: DataTypes.JSONB,
    },
    products: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 3,
      },
      comment: '0: Created, 1: Purcahse Phase, 2: Pre-Production, 3: Production',
    },
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user',
    });
    Order.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      onDelete: 'CASCADE',
      as: 'organization',
    });
    Order.belongsTo(models.Product, {
      foreignKey: 'styleId',
      onDelete: 'CASCADE',
      as: 'style',
    });
  };
  return Order;
};
