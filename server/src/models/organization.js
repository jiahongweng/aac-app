import { ERROR_MESSAGES } from '../../utils/constants';

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'Organization',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: ERROR_MESSAGES.ORGANIZATION_NAME_ALREADY_TAKEN,
        },
      },
      location: DataTypes.JSONB,
      shippingAddress: DataTypes.JSONB,
    },
    {},
  );
  Organization.associate = function (models) {
    // associations can be defined here
    Organization.hasOne(models.User, {
      foreignKey: 'organizationId',
      as: 'representative',
    });
  };
  return Organization;
};
