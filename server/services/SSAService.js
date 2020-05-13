/* eslint-disable no-useless-catch */
import sequelize, { Op } from 'sequelize';
import database from '../src/models';

class SSAService {
  static async getAllStyles({ page, limit, search, brand, isFilter = false }) {
    try {
      const option = {
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt'],
        },
        where: {},
      };
      if (search) {
        option.where = {
          ...option.where,
          [Op.or]: [
            sequelize.where(
              sequelize.cast(sequelize.col('SSA_Style.styleId'), 'varchar'),
              { [Op.iLike]: `%${search}%` },
            ),
            { styleName: { [Op.iLike]: `%${search}%` } },
            { brandName: { [Op.iLike]: `%${search}%` } },
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }
      if (brand) {
        option.where = {
          ...option.where,
          brandName: brand,
        };
      }
      if (isFilter) {
        return await database.SSA_Style.findAll(option);
      }
      return await database.SSA_Style.findAndCountAll({
        ...option,
        limit,
        offset: page * limit,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getStyle(styleId) {
    try {
      const style = await database.SSA_Style.findOne({
        where: { styleId: Number(styleId) },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      return style;
    } catch (error) {
      throw error;
    }
  }

  static async truncateStyles() {
    try {
      await database.SSA_Style.sync({ force: true });
    } catch (error) {
      throw error;
    }
  }

  static async syncStyles({ styles }) {
    styles.forEach(
      async ({
        styleID,
        styleName,
        styleImage,
        brandName,
        brandImage,
        title,
        description,
      }) => {
        await database.SSA_Style.create({
          styleId: styleID,
          styleName,
          styleImage,
          brandName,
          brandImage,
          title,
          description,
        });
      },
    );
  }
}

export default SSAService;
