/* eslint-disable no-useless-catch */
import database from '../src/models';

class OrganizationService {
  static async getAllOrganizations({ order, orderBy, page, limit }) {
    try {
      let orders = [['createdAt', 'asc']];
      if ((order === 'asc' || order === 'desc') && orderBy) {
        if (orderBy.includes('representative.')) {
          orders = [
            [
              { model: database.User, as: 'representative' },
              orderBy.split('representative.')[1],
              order,
            ],
          ];
        } else {
          orders = [[orderBy, order]];
        }
      }
      return await database.Organization.findAndCountAll({
        order: orders,
        limit,
        offset: page * limit,
        include: [
          {
            model: database.User,
            as: 'representative',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  static async addOrganization(newOrganization) {
    try {
      return await database.Organization.create(newOrganization);
    } catch (error) {
      throw error;
    }
  }

  static async updateOrganization(id, updateOrganization) {
    try {
      const organizationToUpdate = await database.Organization.findOne({
        where: { id: Number(id) },
      });

      if (organizationToUpdate) {
        await database.Organization.update(updateOrganization, {
          where: { id: Number(id) },
        });

        return updateOrganization;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOrganization(id) {
    try {
      const theOrganization = await database.Organization.findOne({
        where: { id: Number(id) },
      });

      return theOrganization;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrganization(id) {
    try {
      const organizationToDelete = await database.Organization.findOne({
        where: { id: Number(id) },
      });

      if (organizationToDelete) {
        const deletedOrganization = await database.Organization.destroy({
          where: { id: Number(id) },
        });
        return deletedOrganization;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default OrganizationService;
