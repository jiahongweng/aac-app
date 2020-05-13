import httpStatus from 'http-status';
import ProductService from '../services/ProductService';
import Util from '../utils/Utils';
import { parseRequestQuery } from '../utils/misc';
import { PAGE_PER_NUM, ERROR_MESSAGES } from '../utils/constants';

const util = new Util();

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const { order, orderBy } = req.query;
      const {
        count: totalCount,
        rows: allProducts,
      } = await ProductService.getAllProducts({
        order,
        orderBy,
        page,
        limit,
      });

      util.setSuccess(httpStatus.OK, {
        total: totalCount,
        page,
        limit,
        products: allProducts,
      });
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }

  static async addProduct(req, res) {
    if (
      !req.body.styleId ||
      !req.body.styleName ||
      !req.body.styleImage ||
      !req.body.brandName ||
      !req.body.brandImage ||
      !req.body.title
    ) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INCOMPLETE_REQUEST);
      return util.send(res);
    }
    const {
      styleId,
      styleName,
      styleImage,
      brandName,
      brandImage,
      title,
      description = '',
    } = req.body;

    try {
      const createdProduct = await ProductService.addProduct({
        styleId,
        styleName,
        styleImage,
        brandName,
        brandImage,
        title,
        description,
      });

      util.setSuccess(httpStatus.CREATED, createdProduct);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }

  static async updateProduct(req, res) {
    const alteredProduct = req.body;
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      let updatedProduct = await ProductService.updateProduct(
        id,
        alteredProduct,
      );

      if (!alteredProduct) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.PRODUCT_NOT_FOUND_WITH_ID(id),
        );
      } else {
        updatedProduct = await ProductService.getProduct(id);
        util.setSuccess(httpStatus.OK, updatedProduct);
      }
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }

    return util.send(res);
  }

  static async getProduct(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const theProduct = await ProductService.getProduct(id);

      if (!theProduct) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.PRODUCT_NOT_FOUND_WITH_ID(id),
        );
      } else {
        util.setSuccess(httpStatus.OK, theProduct);
      }
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }

    return util.send(res);
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const productToDelete = await ProductService.deleteProduct(id);

      if (productToDelete) {
        util.setSuccess(httpStatus.OK, { deletedId: Number(id) });
      } else {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.PRODUCT_NOT_FOUND_WITH_ID(id),
        );
      }
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }

  static async deleteProductByStyle(req, res) {
    const { styleId } = req.params;

    if (!Number(styleId)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const productToDelete = await ProductService.deleteProductByStyle(
        styleId,
      );

      if (productToDelete) {
        util.setSuccess(httpStatus.OK);
      } else {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.PRODUCT_NOT_FOUND_WITH_Style_ID(styleId),
        );
      }
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }
}

export default ProductController;
