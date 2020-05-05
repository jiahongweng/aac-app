import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';
import { Row, Card, CardBody, Button } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import ReactTable from 'react-table';
import { last } from 'lodash';
import UserModal from 'containers/User';
import OrganizationModal from 'containers/Organization';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { TablePagination } from 'components/pagination';
import { ROLES, ACTIONS } from 'utils/constants';
import { DEFAULT_PAGE_SIZE } from './constants';

class OrganizationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: ACTIONS.NONE,
      modalOpen: false,
      needRefresh: false,
      organizationId: null,
      userId: null,
      userModalOpen: false,
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
    this.props.fetchOrganizationList({
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
        fetchOrganizationList,
        organizations: { page, limit },
      } = prevProps;
      fetchOrganizationList({ order, orderBy, page, limit });
      this.setState({ needRefresh: false });
    }
  };

  deleteOrganization = async (organizationId) => {
    const confirmResult = await confirm({
      title: <span className="text-danger">Delete Confirmation</span>,
      message: 'Would you like to remove this organization from the list?',
      confirmText: 'Confirm',
    });
    if (confirmResult) {
      this.props.deleteSelectedOrganization({ id: organizationId });
    }
  };

  openModal = (mode, organizationId = null) => {
    this.setState({ mode, organizationId });
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

  openUserModal = (userId = null, mode = ACTIONS.EDIT) => {
    this.setState({ userId, mode });
    this.toggleUserModal();
  };

  toggleUserModal = (needRefresh = false) => {
    this.setState((prevState) => ({
      ...prevState,
      userModalOpen: !prevState.userModalOpen,
      mode: prevState.modalOpen ? ACTIONS.NONE : prevState.mode,
      needRefresh,
    }));
  };

  render() {
    const {
      currentUser: { data: currentUserData },
      organizations: { loading, error, data, total, limit },
      match,
    } = this.props;
    const {
      mode,
      organizationId,
      modalOpen,
      userId,
      userModalOpen,
    } = this.state;

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
            <Breadcrumb heading="organizations" match={match} />
            {/* Disable organization creation for admin
            <div className="text-zero top-right-button-container mb-2">
              <Button
                color="primary"
                size="lg"
                className="top-right-button text-uppercase"
                onClick={() => this.openModal(ACTIONS.CREATE)}
              >
                Add New
              </Button>
            </div> */}
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
                      accessor: 'name',
                      Cell: (props) => (
                        <NavLink
                          to="#"
                          onClick={() =>
                            this.openModal(ACTIONS.EDIT, props.original.id)
                          }
                        >
                          <p className="font-weight-semibold truncate">
                            {props.value}
                          </p>
                        </NavLink>
                      ),
                    },
                    {
                      Header: 'Location',
                      accessor: 'location',
                      Cell: ({
                        value: { address1, address2, city, state, zipCode },
                      }) => (
                        <p className="text-muted">
                          {`${address1}${address2 ? `, ${address2}` : ''}`}
                          <br />
                          {`${city}, ${state} ${zipCode}`}
                        </p>
                      ),
                    },
                    {
                      Header: 'Shipping Address',
                      accessor: 'shippingAddress',
                      Cell: ({
                        value: { address1, address2, city, state, zipCode },
                      }) => (
                        <p className="text-muted">
                          {`${address1}${address2 ? `, ${address2}` : ''}`}
                          <br />
                          {`${city}, ${state} ${zipCode}`}
                        </p>
                      ),
                    },
                    {
                      Header: 'Representative',
                      accessor: 'representative.firstName',
                      Cell: (props) => (
                        <NavLink
                          to="#"
                          onClick={() =>
                            this.openUserModal(props.original.representative.id)
                          }
                        >
                          <p className="font-weight-semibold truncate">
                            {`${props.original.representative.firstName} ${props.original.representative.lastName}`}
                          </p>
                        </NavLink>
                      ),
                    },
                    {
                      Header: 'Action',
                      accessor: null,
                      sortable: false,
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
                            onClick={() =>
                              this.deleteOrganization(props.original.id)
                            }
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
                  minRows={0}
                  getTheadThProps={() => ({
                    className: 'px-4',
                  })}
                  getTdProps={() => ({
                    className: 'px-4',
                  })}
                  getTrGroupProps={() => ({
                    className: 'py-2',
                  })}
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <OrganizationModal
          mode={mode}
          organizationId={organizationId}
          isOpen={modalOpen}
          toggle={this.toggleModal}
        />
        <UserModal
          mode={mode}
          userId={userId}
          isOpen={userModalOpen}
          toggle={this.toggleUserModal}
        />
      </>
    );
  }
}

OrganizationList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
  needRefresh: PropTypes.bool.isRequired,
  fetchOrganizationList: PropTypes.func.isRequired,
  deleteSelectedOrganization: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default OrganizationList;
