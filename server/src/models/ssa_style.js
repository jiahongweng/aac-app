'use strict';
module.exports = (sequelize, DataTypes) => {
  const SSA_Style = sequelize.define(
    'SSA_Style',
    {
      styleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  SSA_Style.associate = function (models) {
    // associations can be defined here
  };
  return SSA_Style;
};
