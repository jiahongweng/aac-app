/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

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
  {
    Header: 'First Name',
    accessor: 'firstName',
    Cell: (props) => <p className="list-item-heading">{props.value}</p>,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Cell: (props) => <p className="list-item-heading">{props.value}</p>,
  },
  {
    Header: 'E-mail',
    accessor: 'email',
    Cell: (props) => <p className="text-muted">{props.value}</p>,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Cell: (props) => <p className="text-muted">{props.value}</p>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: (props) => <p className="text-muted">{props.value}</p>,
  },
];
