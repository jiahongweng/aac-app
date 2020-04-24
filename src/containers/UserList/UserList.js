/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Row, Card, CardBody, Button } from 'reactstrap';
import ReactTable from 'react-table';
import { last } from 'lodash';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { TablePagination } from 'components/pagination';
import { ROLES } from 'utils/constants';
import { columns } from './constants';

class UserList extends Component {
  fetchData = (state) => {
    const { sorted = [], page, pageSize: limit } = state;
    let order = '';
    let orderBy = '';
    if (sorted.length) {
      const lastSorted = last(sorted);
      order = lastSorted.desc ? 'desc' : 'asc';
      orderBy = lastSorted.id;
    }
    this.props.fetchUserList({
      order,
      orderBy,
      page,
      limit,
    });
  };

  toggleModal = () => {
    console.log('Add a new user.');
  };

  render() {
    const {
      currentUser: { data: currentUserData },
      users: { loading, error, data, total, limit },
      match,
    } = this.props;
    if (ROLES.ADMIN !== currentUserData.role) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    if (error) {
      NotificationManager.error(error.message, 'Error', 3000, null, null, '');
    }
    return (
      <>
        <Row>
          <Colxx xxs="12">
            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button text-uppercase"
                onClick={this.toggleModal()}
              >
                Add New
              </Button>
            </div>
            <Breadcrumb heading="users" match={match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <ReactTable
                  columns={columns}
                  manual
                  data={data}
                  loading={loading}
                  pages={Math.ceil(total / limit)}
                  defaultPageSize={5}
                  onFetchData={this.fetchData}
                  PaginationComponent={TablePagination}
                  showPageJump={false}
                  showPageSizeOptions
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </>
    );
  }
}

UserList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  needRefresh: PropTypes.bool.isRequired,
  fetchUserList: PropTypes.func.isRequired,
  deleteSelectedUser: PropTypes.func.isRequired,
  deleteSelectedUsers: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default UserList;
