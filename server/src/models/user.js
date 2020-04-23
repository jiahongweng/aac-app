import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../../utils/constants';

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
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      status: {
        type: DataTypes.INTEGER,
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
          return bcrypt
            .hash(user.password, BCRYPT_SALT_ROUNDS)
            .then((hash) => {
              user.password = hash;
            })
            .catch((err) => {
              throw new Error();
            });
        },
        beforeUpdate: (user, options) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, BCRYPT_SALT_ROUNDS);
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
    // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return User;
};
