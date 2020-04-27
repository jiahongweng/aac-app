import httpStatus from 'http-status';
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import { userWithoutPassword, parseRequestQuery } from '../utils/misc';
import { PAGE_PER_NUM, ERROR_MESSAGES } from '../utils/constants';

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const { order, orderBy } = req.query;
      const {
        count: totalCount,
        rows: allUsers,
      } = await UserService.getAllUsers({
        order,
        orderBy,
        page,
        limit,
      });
      util.setSuccess(httpStatus.OK, {
        total: totalCount,
        page,
        limit,
        users: allUsers.map((user) => userWithoutPassword(user)),
      });
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error);
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
    if (await UserService.getUserByEmail(email)) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.EMAIL_ALREADY_TAKEN);
      return util.send(res);
    }
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
      util.setSuccess(httpStatus.CREATED, userWithoutPassword(createdUser));
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
    try {
      let updatedUser = await UserService.updateUser(id, alteredUser);
      if (!updatedUser) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(id),
        );
      } else {
        updatedUser = await UserService.getUserById(id);
        util.setSuccess(httpStatus.OK, userWithoutPassword(updatedUser));
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error);
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
      const theUser = await UserService.getUserById(id);

      if (!theUser) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(id),
        );
      } else {
        util.setSuccess(httpStatus.OK, userWithoutPassword(theUser));
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error);
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
      util.setError(httpStatus.BAD_REQUEST, error);
      return util.send(res);
    }
  }
}

export default UserController;
