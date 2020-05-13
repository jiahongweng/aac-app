import httpStatus from 'http-status';
import UserService from '../services/UserService';
import OrganizationService from '../services/OrganizationService';
import Util from '../utils/Utils';
import { parseRequestQuery } from '../utils/misc';
import { PAGE_PER_NUM, ERROR_MESSAGES } from '../utils/constants';

const util = new Util();

class OrganizationController {
  static async getAllOrganizations(req, res) {
    try {
      const { page = 0, limit = PAGE_PER_NUM } = parseRequestQuery(req.query);
      const { order, orderBy } = req.query;
      const {
        count: totalCount,
        rows: allOrganizations,
      } = await OrganizationService.getAllOrganizations({
        order,
        orderBy,
        page,
        limit,
      });

      util.setSuccess(httpStatus.OK, {
        total: totalCount,
        page,
        limit,
        organizations: allOrganizations,
      });
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async addOrganization(req, res) {
    if (
      !req.body.name ||
      !req.body.userId ||
      !req.body.location ||
      !req.body.shippingAddress
    ) {
      util.setError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INCOMPLETE_REQUEST);
      return util.send(res);
    }
    const { name, userId, location, shippingAddress } = req.body;
    try {
      const user = await UserService.getUser(userId);
      if (!user) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID(userId),
        );
        return util.send(res);
      }
      if (user.organization) {
        util.setError(
          httpStatus.BAD_REQUEST,
          ERROR_MESSAGES.ORGANIZATION_ALEADY_EXIST_WITH_USER,
        );
        return util.send(res);
      }

      try {
        const createdOrganization = await OrganizationService.addOrganization({
          name,
          location,
          shippingAddress,
        });
        await user.setOrganization(createdOrganization);
        util.setSuccess(httpStatus.CREATED, createdOrganization);
      } catch (error) {
        util.setError(httpStatus.BAD_REQUEST, error.message);
      }
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }
    return util.send(res);
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
      let updatedOrganization = await OrganizationService.updateOrganization(
        id,
        alteredOrganization,
      );
      if (!updatedOrganization) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.ORGANIZATION_NOT_FOUND_WITH_ID(id),
        );
      } else {
        updatedOrganization = await OrganizationService.getOrganization(id);
        util.setSuccess(httpStatus.OK, updatedOrganization);
      }
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
    }
    return util.send(res);
  }

  static async getOrganization(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        httpStatus.NOT_ACCEPTABLE,
        ERROR_MESSAGES.INVALID_NUMERIC_VALUE,
      );
      return util.send(res);
    }

    try {
      const theOrganization = await OrganizationService.getOrganization(id);

      if (!theOrganization) {
        util.setError(
          httpStatus.NOT_FOUND,
          ERROR_MESSAGES.ORGANIZATION_NOT_FOUND_WITH_ID(id),
        );
      } else {
        util.setSuccess(httpStatus.OK, theOrganization);
      }
      return util.send(res);
    } catch (error) {
      util.setError(httpStatus.NOT_FOUND, error.message);
      return util.send(res);
    }
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
      const organizationToDelete = await OrganizationService.deleteOrganization(
        id,
      );

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

export default OrganizationController;
