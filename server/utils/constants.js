export const BCRYPT_SALT_ROUNDS = 10;
export const PAGE_PER_NUM = 10;
export const RESET_PASSWORD_EXPIRES = 60 * 60 * 1000;

export const ROLES = {
  ADMIN: 2,
  CLIENT: 1,
};

export const STATUSES = {
  ACTIVE: 1,
  INACTIVE: 0,
};

export const SS_ACTIVEWARE = {
  API_BASE: 'https://api.ssactivewear.com/v2',
  CDN_BASE: 'https://cdn.ssactivewear.com',
};

export const ERROR_MESSAGES = {
  API_NOT_FOUND: 'API not found.',
  INCOMPLETE_REQUEST: 'Please provide all required fields.',
  EMAIL_ALREADY_TAKEN:
    'Oops. Looks like someone already has an account with this email address',
  INVALID_VERIFICATION_CODE: 'Invalid verification code.',
  INVALID_NUMERIC_VALUE: 'Please input a valid numeric value',
  INVALID_EMAIL: 'Invalid email address.',
  INVALID_PASSWORD: 'Invalid password.',
  INVALID_RESET_PASSWORD: 'Password reset link is invalid or has expired.',
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
  PRODUCT_ALEADY_TAKEN: 'We have this product in the AAC product list already.',
  PRODUCT_NOT_FOUND_WITH_ID: (ProductId) =>
    `Cannot find product with the id: ${ProductId}`,
  PRODUCT_NOT_FOUND_WITH_Style_ID: (StyleId) =>
    `Cannot find product with the style id: ${StyleId}`,
  ORDER_NOT_FOUND_WITH_ID: (orderId) =>
    `Cannot find the order with the id: ${orderId}`,
  UPLOAD_NO_FILE: 'No file was uploaded',
};
