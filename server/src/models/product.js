'use strict';
import { ERROR_MESSAGES } from '../../utils/constants';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      styleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: {
          msg: ERROR_MESSAGES.PRODUCT_ALEADY_TAKEN,
        },
      },
      styleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      styleImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brandName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brandImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {},
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Order, {
      foreignKey: 'styleId',
      as: 'products',
    });
  };
  return Product;
};
