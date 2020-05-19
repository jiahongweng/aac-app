import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS, ERROR_MESSAGES } from '../../utils/constants';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: ERROR_MESSAGES.INVALID_EMAIL,
          },
        },
        allowNull: false,
        unique: {
          msg: ERROR_MESSAGES.EMAIL_ALREADY_TAKEN,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: DataTypes.STRING,
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 2,
        },
        comment: '1: Client, 2: Admin',
      },
      organizationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Organization',
          key: 'id',
          as: 'organizationId',
        },
      },
      yearsInSchool: {
        type: DataTypes.INTEGER,
      },
      verificationCode: {
        type: DataTypes.STRING,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 2,
        },
        comment: '0: Inactive, 1: Active, 2: Deleted',
      },
    },
    {
      hooks: {
        beforeSave: (user, options) => {
          if (options.fields.includes('password')) {
            return bcrypt
              .hash(user.password, BCRYPT_SALT_ROUNDS)
              .then((hash) => {
                user.password = hash;
              })
              .catch((err) => {
                throw new Error();
              });
          }
        },
      },
    },
  );
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      onDelete: 'SET NULL',
      as: 'organization',
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
  };
  return User;
};
