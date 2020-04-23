export const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const getTokenInStorage = () => localStorage.getItem('token');
export const getUserInStorage = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export const saveTokenInStorage = (token) =>
  localStorage.setItem('token', token);
export const saveUserInStorage = (user) =>
  localStorage.setItem('user', JSON.stringify(user));

export const deleteTokenInStorage = () => localStorage.removeItem('token');
export const deleteUserInStorage = () => localStorage.removeItem('user');
