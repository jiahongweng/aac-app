import httpStatus from 'http-status';
import { remove } from 'lodash';
import UserService from '../services/UserService';
import OrderService from '../services/OrderService';
import AwsService from '../services/AwsService';
import Util from '../utils/Utils';
import { parseRequestQuery, generateOrderId } from '../utils/misc';
import { ROLES, PAGE_PER_NUM, ERROR_MESSAGES } from '../utils/constants';

const util = new Util();

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const { order, orderBy } = req.query;
      const { id: userId, role } = req.user;
      const {
        count: totalCount,
        rows: allOrders,
      } = await OrderService.getAllOrders({
        userId: role === ROLES.CLIENT ? userId : null,
        order,
        orderBy,
        page,
        limit,
      });

      util.setSuccess(httpStatus.OK, {
        total: totalCount,
        page,
        limit,
        orders: allOrders,
      });
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async createOrder(req, res) {
    if (!req.body.styleId || !req.body.dueDate || !req.body.products) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INCOMPLETE_REQUEST);
      return util.send(res);
    }
    const { styleId, dueDate, note, products } = req.body;
    const { id: userId } = req.user;

    try {
      const user = await UserService.getUser(userId);

      if (!user) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(userId),
        );
        return util.send(res);
      }

      // generate unique order Id
      const orderId = generateOrderId();
      const createdOrder = await OrderService.createOrder({
        orderId,
        userId,
        organizationId: user.organization.id,
        dueDate,
        note,
        styleId,
        products,
      });

      util.setSuccess(httpStatus.CREATED, createdOrder);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }

    return util.send(res);
  }

  static async getOrder(req, res) {
    const { orderId } = req.params;

    try {
      const order = await OrderService.getOrder(orderId);

      util.setSuccess(httpStatus.OK, order);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }

    return util.send(res);
  }

  static async updateOrder(req, res) {
    const alteredOrder = req.body;
    const { orderId } = req.params;

    try {
      await OrderService.updateOrder(orderId, alteredOrder);
      const updatedOrder = await OrderService.getOrder(orderId);
      util.setSuccess(httpStatus.OK, updatedOrder);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }

    return util.send(res);
  }

  static async deleteOrder(req, res) {
    const { orderId } = req.params;

    try {
      await OrderService.deleteOrder(orderId);
      util.setSuccess(httpStatus.OK, { deletedId: orderId });
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
    }

    return util.send(res);
  }

  static async uploadOrderDesignFile(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.UPLOAD_NO_FILE);
      return util.send(res);
    }

    const { orderId } = req.params;
    const file = req.files.order_file;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${orderId}/${file.name}`,
      Body: file.data,
      ContentType: file.mimetype,
    };

    try {
      const order = await OrderService.getOrder(orderId);

      await AwsService.uploadFileToS3Bucket(params);

      order.designs = [...(order.designs || []), file.name];
      await order.save();

      util.setSuccess(httpStatus.OK);
    } catch (error) {
      util.setError(httpStatus.FORBIDDEN, error.message);
    }

    return util.send(res);
  }

  static async deleteOrderDesignFile(req, res) {
    const { orderId } = req.params;
    const { img } = req.body;

    try {
      const { designs } = await OrderService.getOrder(orderId);

      remove(designs, (design) => design === img);
      await OrderService.updateOrder(orderId, { designs });

      const order = await OrderService.getOrder(orderId);

      util.setSuccess(httpStatus.OK, order);
    } catch (error) {
      util.setError(httpStatus.FORBIDDEN, error.message);
    }

    return util.send(res);
  }
}

export default OrderController;
