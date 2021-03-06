import httpStatus from 'http-status';
import { isEmpty } from 'lodash';
import UserService from '../services/UserService';
import OrganizationService from '../services/OrganizationService';
import Util from '../utils/Utils';
import { parseRequestQuery } from '../utils/misc';
import { PAGE_PER_NUM, ERROR_MESSAGES } from '../utils/constants';

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const { order, orderBy } = req.query;
      const { count: totalCount, rows: users } = await UserService.getAllUsers({
        order,
        orderBy,
        page,
        limit,
      });
      util.setSuccess(httpStatus.OK, {
        total: totalCount,
        page,
        limit,
        users,
      });
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async addUser(req, res) {
    if (
      !req.body.firstName ||
      !req.body.firstName ||
      !req.body.email ||
      !req.body.password
    ) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INCOMPLETE_REQUEST);
      return util.send(res);
    }
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      status,
    } = req.body;
    try {
      const createdUser = await UserService.addUser({
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
        status,
      });
      util.setSuccess(
        httpStatus.CREATED,
        await UserService.getUser(createdUser.id),
      );
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async updateUser(req, res) {
    const alteredUser = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }
    const { oldPassword = null } = alteredUser;
    if (!isEmpty(oldPassword) && !req.user.isValidPassword(oldPassword)) {
      util.setError(httpStatus.NOT_ACCEPTABLE, ERROR_MESSAGES.INVALID_PASSWORD);
      return util.send(res);
    }
    try {
      let updatedUser = await UserService.updateUser(id, alteredUser);
      if (!updatedUser) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(id),
        );
      } else {
        updatedUser = await UserService.getUser(id);
        util.setSuccess(httpStatus.OK, updatedUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
      return util.send(res);
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const theUser = await UserService.getUser(id);

      if (!theUser) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(id),
        );
      } else {
        util.setSuccess(httpStatus.OK, theUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
      return util.send(res);
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const userToDelete = await UserService.deleteUser(id);

      if (userToDelete) {
        util.setSuccess(httpStatus.OK, { deletedId: Number(id) });
      } else {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(id),
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async updateOrganization(req, res) {
    if (!req.body.name || !req.body.location || !req.body.shippingAddress) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INCOMPLETE_REQUEST);
      return util.send(res);
    }

    const { user, body } = req;
    const { organizationId = null } = user;
    const { name, location, shippingAddress } = body;

    if (organizationId) {
      try {
        await OrganizationService.updateOrganization(organizationId, {
          name,
          location,
          shippingAddress,
        });
      } catch (error) {
        util.setError(httpStatus.NOT_FOUND, error.message);
        return util.send(res);
      }
    } else {
      try {
        const createdOrganization = await OrganizationService.addOrganization({
          name,
          location,
          shippingAddress,
        });
        await user.setOrganization(createdOrganization);
      } catch (error) {
        util.setError(httpStatus.NOT_FOUND, error.message);
        return util.send(res);
      }
    }

    util.setSuccess(httpStatus.OK, await UserService.getUser(user.id));
    return util.send(res);
  }
}

export default UserController;
