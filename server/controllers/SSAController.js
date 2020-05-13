import axios from 'axios';
import httpStatus from 'http-status';
import SSAService from '../services/SSAService';
import Util from '../utils/Utils';
import { parseRequestQuery } from '../utils/misc';
import { SS_ACTIVEWARE, PAGE_PER_NUM } from '../utils/constants';

const util = new Util();

const makeJsonRequestOptions = ({ method, endpoint, data, ...rest }) => ({
  method,
  url: `${SS_ACTIVEWARE.API_BASE}/${endpoint}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic  ${Buffer.from(
      `${process.env.SS_ACTIVEWEAR_API_USER}:${process.env.SS_ACTIVEWEAR_API_PASS}`,
      'utf8',
    ).toString('base64')}`,
  },
  ...(data ? { data } : {}),
  ...rest,
});

class SSAController {
  static async syncAllSsaStyles(req, res) {
    try {
      const { error, data: styles } = await axios(
        makeJsonRequestOptions({
          method: 'GET',
          endpoint:
            'styles/?fields=styleID,styleName,brandName,title,description,styleImage,brandImage',
        }),
      );

      if (error) {
        util.setError(httpStatus.BAD_REQUEST, error.message);
        return util.send(res);
      }

      await SSAService.truncateStyles();
      await SSAService.syncStyles({ styles });

      util.setSuccess(httpStatus.OK, {
        success: true,
      });
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }

  static async getAllStyles(req, res) {
    try {
      const { search, brand } = req.query;
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const {
        count: totalCount,
        rows: allStyles,
      } = await SSAService.getAllStyles({ page, limit, search, brand });
      const styles = await SSAService.getAllStyles({
        search,
        isFilter: true,
      });
      const filters = styles.reduce((accur, product) => {
        const {
          dataValues: { brandName },
        } = product;
        // eslint-disable-next-line no-param-reassign
        accur[brandName] = accur[brandName]
          ? parseInt(accur[brandName]) + 1
          : 1;
        return accur;
      }, {});

      util.setSuccess(httpStatus.OK, {
        total: totalCount,
        page,
        limit,
        styles: allStyles,
        filters,
      });
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }

  static async getProductsByStyle(req, res) {
    try {
      const { styleId } = req.params;
      const { error, data: prodcutsData } = await axios(
        makeJsonRequestOptions({
          method: 'GET',
          endpoint: `products/?style=${styleId}`,
        }),
      );
      const { err, data: specsData } = await axios(
        makeJsonRequestOptions({
          method: 'GET',
          endpoint: `specs/?style=${styleId}`,
        }),
      );

      if (error || err) {
        util.setError(httpStatus.BAD_REQUEST, error.message);
        return util.send(res);
      }

      const product = await SSAService.getStyle(styleId);
      const details = prodcutsData.reduce(
        (
          accur,
          {
            colorName,
            color1: color,
            colorSwatchImage,
            colorSwatchTextColor,
            colorFrontImage,
            colorSideImage,
            colorBackImage,
            sizeName,
            caseQty,
            sku,
          },
        ) => {
          // eslint-disable-next-line no-param-reassign
          accur[colorName] = {
            ...accur[colorName],
            colorName,
            color,
            colorSwatchImage,
            colorSwatchTextColor,
            colorFrontImage,
            colorSideImage,
            colorBackImage,
            sizes: {
              ...(accur[colorName] ? accur[colorName].sizes : {}),
              [sizeName]: {
                sku,
                caseQty,
              },
            },
          };
          return accur;
        },
        {},
      );
      const specs = specsData.reduce((accur, { sizeName, specName, value }) => {
        // eslint-disable-next-line no-param-reassign
        accur[specName] = {
          ...accur[specName],
          [sizeName]: value,
        };
        return accur;
      }, {});

      util.setSuccess(httpStatus.OK, {
        ...product.dataValues,
        specs,
        details,
      });
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }
}

export default SSAController;
