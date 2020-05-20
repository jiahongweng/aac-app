/* eslint-disable no-useless-catch */
import database from '../src/models';

class OrderService {
  static async getAllOrders({ userId, order, orderBy, page, limit }) {
    try {
      let where = {};
      if (userId) {
        where = { id: userId };
      }
      let orders = [['createdAt', 'asc']];
      if ((order === 'asc' || order === 'desc') && orderBy) {
        orders = [[orderBy, order]];
      }
      return await database.Order.findAndCountAll({
        order: orders,
        limit,
        offset: page * limit,
        include: [
          {
            model: database.User,
            as: 'user',
            where,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
          },
          {
            model: database.Organization,
            as: 'organization',
            attributes: ['id', 'name', 'location', 'shippingAddress'],
          },
          {
            model: database.Product,
            otherKey: 'styleId',
            as: 'style',
            attributes: [
              'styleName',
              'styleImage',
              'brandName',
              'brandImage',
              'title',
              'description',
            ],
          },
        ],
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt'],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(order) {
    try {
      return await database.Order.create(order);
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(orderId, order) {
    try {
      const orderToUpdate = await database.Order.findOne({
        where: { orderId },
      });

      if (orderToUpdate) {
        await database.Order.update(order, {
          where: { orderId },
        });

        return order;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOrder(orderId) {
    try {
      const order = await database.Order.findOne({
        where: { orderId },
        include: [
          {
            model: database.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
          },
          {
            model: database.Organization,
            as: 'organization',
            attributes: ['id', 'name', 'location', 'shippingAddress'],
          },
          {
            model: database.Product,
            otherKey: 'styleId',
            as: 'style',
            attributes: [
              'styleName',
              'styleImage',
              'brandName',
              'brandImage',
              'title',
              'description',
            ],
          },
        ],
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt'],
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(orderId) {
    try {
      const orderToDelete = await database.Order.findOne({
        where: { orderId },
      });

      if (orderToDelete) {
        const order = await database.Order.destroy({
          where: { orderId },
        });
        return order;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;
