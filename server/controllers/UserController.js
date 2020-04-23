import httpStatus from 'http-status';
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import { userWithoutPassword, parseRequestQuery } from '../utils/misc';

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      util.setSuccess(
        httpStatus.OK,
        'Users retrieved',
        allUsers.map((user) => userWithoutPassword(user)),
      );
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
      util.setError(httpStatus.BAD_REQUEST, 'Please provide complete details');
      return util.send(res);
    }
    const newUser = req.body;
    try {
      const createdUser = await UserService.addUser(newUser);
      util.setSuccess(
        httpStatus.CREATED,
        'User Added!',
        userWithoutPassword(createdUser),
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
        'Please input a valid numeric value',
      );
      return util.send(res);
    }
    try {
      let updatedUser = await UserService.updateUser(id, alteredUser);
      if (!updatedUser) {
        util.setError(
          httpStatus.NOT_FOUND,
          `Cannot find user with the id: ${id}`,
        );
      } else {
        updatedUser = await UserService.getUser(id);
        util.setSuccess(
          httpStatus.OK,
          'User updated',
          userWithoutPassword(updatedUser),
        );
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
        'Please input a valid numeric value',
      );
      return util.send(res);
    }

    try {
      const theUser = await UserService.getUser(id);

      if (!theUser) {
        util.setError(
          httpStatus.NOT_FOUND,
          `Cannot find user with the id ${id}`,
        );
      } else {
        util.setSuccess(
          httpStatus.OK,
          'Found User',
          userWithoutPassword(theUser),
        );
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
        'Please provide a numeric value',
      );
      return util.send(res);
    }

    try {
      const userToDelete = await UserService.deleteUser(id);

      if (userToDelete) {
        util.setSuccess(httpStatus.OK, 'User deleted');
      } else {
        util.setError(
          httpStatus.NOT_FOUND,
          `User with the id ${id} cannot be found`,
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
