export const FETCH_USERS = 'UserList/FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'UserList/FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'UserList/FETCH_USERS_ERROR';

export const DELETE_USER = 'UserList/DELETE_USER';
export const DELETE_USER_SUCCESS = 'UserList/DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'UserList/DELETE_USER_ERROR';

export const DELETE_USERS = 'UserList/DELETE_USERS';
export const DELETE_USERS_SUCCESS = 'UserList/DELETE_USERS_SUCCESS';
export const DELETE_USERS_ERROR = 'UserList/DELETE_USERS_ERROR';

export const columns = [
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
];
