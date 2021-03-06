/* eslint-disable no-useless-catch */
import database from '../src/models';

class UserService {
  static async getAllUsers({ order, orderBy, page, limit }) {
    try {
      let orders = [['createdAt', 'asc']];
      if ((order === 'asc' || order === 'desc') && orderBy) {
        orders = [[orderBy, order]];
      }
      return await database.User.findAndCountAll({
        where: {
          role: 1,
        },
        attributes: {
          exclude: [
            'password',
            'verificationCode',
            'resetPasswordToken',
            'resetPasswordExpires',
            'createdAt',
            'updatedAt',
          ],
        },
        order: orders,
        limit,
        offset: page * limit,
      });
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { id: Number(id) },
      });

      if (userToUpdate) {
        await database.User.update(updateUser, {
          where: { id: Number(id) },
          individualHooks: true,
        });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: database.Organization,
            as: 'organization',
          },
        ],
        attributes: {
          exclude: [
            'organizationId',
            'password',
            'verificationCode',
            'resetPasswordToken',
            'resetPasswordExpires',
            'createdAt',
            'updatedAt',
          ],
        },
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserBy(where) {
    try {
      const theUser = await database.User.findOne({ where });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const userToDelete = await database.User.findOne({
        where: { id: Number(id) },
      });

      if (userToDelete) {
        const userOrganization = await userToDelete.getOrganization();
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) },
        });

        if (userOrganization) {
          await userOrganization.destroy();
        }
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
