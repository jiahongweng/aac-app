import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Row, Card, CardBody, Button, Badge } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import ReactTable from 'react-table';
import { last } from 'lodash';
import UserModal from 'containers/User';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { TablePagination } from 'components/pagination';
import { ROLES, ACTIONS } from 'utils/constants';
import { DEFAULT_PAGE_SIZE, STATUS } from './constants';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: ACTIONS.NONE,
      modalOpen: false,
      needRefresh: false,
      userId: null,
      order: '',
      orderBy: '',
    };
  }

  componentDidUpdate(prevProps) {
    this.refreshData(prevProps);
  }

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
    this.setState({ order, orderBy });
  };

  refreshData = (prevProps) => {
    const { needRefresh, order, orderBy } = this.state;
    if (
      (!prevProps.needRefresh && this.props.needRefresh) ||
      needRefresh === true
    ) {
      const {
        fetchUserList,
        users: { page, limit },
      } = prevProps;
      fetchUserList({ order, orderBy, page, limit });
      this.setState({ needRefresh: false });
    }
  };

  deleteUser = async (userId) => {
    const confirmResult = await confirm({
      title: <span className="text-danger">Delete Confirmation</span>,
      message: 'Would you like to remove this user from the list?',
      confirmText: 'Confirm',
    });
    if (confirmResult) {
      this.props.deleteSelectedUser({ id: userId });
    }
  };

  openModal = (mode, userId = null) => {
    this.setState({ mode, userId });
    this.toggleModal();
  };

  toggleModal = (needRefresh = false) => {
    this.setState((prevState) => ({
      ...prevState,
      modalOpen: !prevState.modalOpen,
      mode: prevState.modalOpen ? ACTIONS.NONE : prevState.mode,
      needRefresh,
    }));
  };

  render() {
    const {
      currentUser: { data: currentUserData },
      users: { loading, error, data, total, limit },
      match,
    } = this.props;
    const { mode, userId, modalOpen } = this.state;

    if (ROLES.ADMIN !== currentUserData.role) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    if (error) {
      NotificationManager.error(error.message, 'Error');
    }

    return (
      <>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="users" match={match} />
            <div className="text-zero top-right-button-container mb-2">
              <Button
                color="primary"
                size="lg"
                className="top-right-button text-uppercase"
                onClick={() => this.openModal(ACTIONS.CREATE)}
              >
                Add New
              </Button>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <ReactTable
                  columns={[
                    {
                      Header: 'Name',
                      accessor: 'firstName',
                      Cell: (props) => (
                        <p className="list-item-heading">
                          {props.original.firstName} {props.original.lastName}
                        </p>
                      ),
                    },
                    {
                      Header: 'E-mail',
                      accessor: 'email',
                      Cell: (props) => (
                        <p className="text-muted">{props.value}</p>
                      ),
                    },
                    {
                      Header: 'Phone',
                      accessor: 'phone',
                      Cell: (props) => (
                        <p className="text-muted">{props.value}</p>
                      ),
                    },
                    {
                      Header: 'Status',
                      accessor: 'status',
                      Cell: (props) => (
                        <Badge
                          color={STATUS[props.value].color}
                          className="px-4"
                          pill
                        >
                          {STATUS[props.value].name}
                        </Badge>
                      ),
                    },
                    {
                      Header: 'Action',
                      accessor: null,
                      Cell: (props) => (
                        <>
                          <Button
                            outline
                            color="info"
                            className="icon-button mx-2"
                            onClick={() =>
                              this.openModal(ACTIONS.EDIT, props.original.id)
                            }
                          >
                            <i className="simple-icon-note" />
                          </Button>
                          <Button
                            outline
                            color="danger"
                            className="icon-button mx-2"
                            onClick={() => this.deleteUser(props.original.id)}
                          >
                            <i className="simple-icon-trash" />
                          </Button>
                        </>
                      ),
                    },
                  ]}
                  manual
                  data={data}
                  loading={loading}
                  pages={Math.ceil(total / limit)}
                  defaultPageSize={DEFAULT_PAGE_SIZE}
                  onFetchData={this.fetchData}
                  PaginationComponent={TablePagination}
                  showPageJump={false}
                  showPageSizeOptions
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <UserModal
          mode={mode}
          userId={userId}
          isOpen={modalOpen}
          toggle={this.toggleModal}
        />
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
  match: PropTypes.object.isRequired,
};

export default UserList;
