const BCRYPT_SALT_ROUNDS = 10;
const PAGE_PER_NUM = 10;

const ROLES = {
  ADMIN: 2,
  CLIENT: 1,
};

export const STATUSES = {
  ACTIVE: 1,
  INACTIVE: 0,
};

const ERROR_MESSAGES = {
  API_NOT_FOUND: 'API not found.',
  INCOMPLETE_REQUEST: 'Please provide all required fields.',
  EMAIL_ALREADY_TAKEN:
    'Oops. Looks like someone already has an account with this email address',
  INVALID_VERIFICATION_CODE: 'Invalid verification code.',
  INVALID_NUMERIC_VALUE: 'Please input a valid numeric value',
  INVALID_EMAIL: 'Invalid email address.',
  INVALID_PASSWORD: 'Invalid password.',
  USER_NOT_FOUND: 'User not found.',
  USER_NOT_FOUND_WITH_ID: (userId) => `Cannot find user with the id: ${userId}`,
  USER_ROLE_NOT_ALLOWED:
    'Current user does not have a role to do this operation.',
  USER_NOT_ACTIVATED:
    'User is not activated yet. Plese check your email and confirm it.',
  USER_NOT_ALLOWED: 'Current user is not allowed to do this operation.',
  ORGANIZATION_NAME_ALREADY_TAKEN:
    'Oops. Looks like someone already has an organization with this name',
  ORGANIZATION_NOT_FOUND_WITH_ID: (organizationId) =>
    `Cannot find organization with the id: ${organizationId}`,
  ORGANIZATION_ALEADY_EXIST_WITH_USER: 'User has an organization already.',
};

export { BCRYPT_SALT_ROUNDS, PAGE_PER_NUM, ROLES, ERROR_MESSAGES };
