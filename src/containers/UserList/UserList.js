import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'components/common/notifications';
import { Breadcrumb } from 'components/navs';
import { columns } from './constants';

const UserList = ({
  currentUser: { data: currentUserData },
  users: { loading, error, data, total },
  needRefresh,
  fetchUserList,
  deleteSelectedUser,
  deleteSelectedUsers,
}) => {
  if (currentUserData.role === 2) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  if (error) {
    NotificationManager.error(
      error.message,
      'Login Error',
      3000,
      null,
      null,
      '',
    );
  }

  return (
    <div className="user_list-page page">
      {/* <EntityTable
        loading={loading}
        entityType={ENTITY_TYPES.USER}
        columns={columns}
        dataSource={data}
        needRefresh={needRefresh}
        totalCount={total}
        fetchData={fetchUserList}
        deleteSelectedEntity={deleteSelectedUser}
        deleteSelectedEntities={deleteSelectedUsers}
      /> */}
    </div>
  );
};

UserList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  needRefresh: PropTypes.bool.isRequired,
  fetchUserList: PropTypes.func.isRequired,
  deleteSelectedUser: PropTypes.func.isRequired,
  deleteSelectedUsers: PropTypes.func.isRequired,
};

export default UserList;
