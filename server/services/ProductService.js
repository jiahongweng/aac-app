/* eslint-disable no-useless-catch */
import database from '../src/models';

class ProductService {
  static async getAllProducts({ order, orderBy, page, limit }) {
    try {
      let orders = [['createdAt', 'asc']];
      if ((order === 'asc' || order === 'desc') && orderBy) {
        orders = [[orderBy, order]];
      }
      return await database.Product.findAndCountAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        order: orders,
        limit,
        offset: page * limit,
      });
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(product) {
    try {
      return await database.Product.create(product);
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(id, product) {
    try {
      const productToUpdate = await database.Product.findOne({
        where: { id: Number(id) },
      });

      if (productToUpdate) {
        await database.Product.update(product, {
          where: { id: Number(id) },
        });

        return product;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getProduct(id) {
    try {
      const product = await database.Product.findOne({
        where: { id: Number(id) },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const productToDelete = await database.Product.findOne({
        where: { id: Number(id) },
      });

      if (productToDelete) {
        const deletedProduct = await database.Product.destroy({
          where: { id: Number(id) },
        });

        return deletedProduct;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
