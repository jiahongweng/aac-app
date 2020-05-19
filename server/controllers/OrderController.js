import httpStatus from 'http-status';
import UserService from '../services/UserService';
import OrderService from '../services/OrderService';
import Util from '../utils/Utils';
import { parseRequestQuery, generateOrderId } from '../utils/misc';
import { PAGE_PER_NUM, ERROR_MESSAGES } from '../utils/constants';

const util = new Util();

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const { order, orderBy } = req.query;
      const {
        count: totalCount,
        rows: allOrders,
      } = await OrderService.getAllOrders({
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
    if (
      !req.body.userId ||
      !req.body.organizationId ||
      !req.body.styleId ||
      !req.body.dueDate ||
      !req.body.products
    ) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INCOMPLETE_REQUEST);
      return util.send(res);
    }
    const {
      userId,
      organizationId,
      styleId,
      dueDate,
      note,
      products,
    } = req.body;

    try {
      const user = await UserService.getUser(userId);

      if (!user) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(userId),
        );
        return util.send(res);
      }
      if (user.organization.id !== organizationId) {
        util.setError(
          httpStatus.BAD_REQUEST,
          ERROR_MESSAGES.ORGANIZATION_NOT_FOUND_WITH_ID(organizationId),
        );
        return util.send(res);
      }

      // generate unique order Id
      const orderId = generateOrderId();
      const createdOrder = await OrderService.createOrder({
        orderId,
        userId,
        organizationId,
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

      if (!order) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.ORDER_NOT_FOUND_WITH_ID(orderId),
        );
      } else {
        util.setSuccess(httpStatus.OK, order);
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
      return util.send(res);
    }
  }

  static async updateOrganization(req, res) {
    const alteredOrganization = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }
    try {
      let updatedOrganization = await OrderService.updateOrganization(
        id,
        alteredOrganization,
      );
      if (!updatedOrganization) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.ORGANIZATION_NOT_FOUND_WITH_ID(id),
        );
      } else {
        updatedOrganization = await OrderService.getOrganization(id);
        util.setSuccess(httpStatus.OK, updatedOrganization);
      }
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }
    return util.send(res);
  }

  static async deleteOrganization(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const organizationToDelete = await OrderService.deleteOrganization(id);

      if (organizationToDelete) {
        util.setSuccess(httpStatus.OK, { deletedId: Number(id) });
      } else {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.ORGANIZATION_NOT_FOUND_WITH_ID(id),
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }
}

export default OrderController;
