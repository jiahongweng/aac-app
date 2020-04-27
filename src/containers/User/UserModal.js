import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { USER_SCHEMA, ROLES, STATUSES, ACTIONS } from 'utils/constants';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect, FormikCustomRadioGroup } from 'components/form';

const roleSelectOptions = [
  { value: ROLES.ADMIN, label: 'Admin' },
  { value: ROLES.CLIENT, label: 'Client' },
];

const statusSelectOptions = [
  { value: STATUSES.INACTIVE, label: 'Inactive' },
  { value: STATUSES.ACTIVE, label: 'Active' },
];

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const {
      isOpen: prevOpen,
      user: { loading: prevLoading },
    } = prevProps;
    const {
      mode,
      userId,
      isOpen,
      fetchSelectedUser,
      user: { loading, error },
      toggle,
    } = this.props;
    if (isOpen && error) {
      NotificationManager.error(error.message, 'Error');
    } else if (isOpen && !prevOpen && mode === ACTIONS.EDIT) {
      fetchSelectedUser({ id: userId });
    } else if (
      isOpen &&
      prevLoading &&
      !loading &&
      this.formRef.current &&
      this.formRef.current.isSubmitting
    ) {
      toggle(true);
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    if (this.formRef.current && this.formRef.current.handleSubmit) {
      return this.formRef.current.handleSubmit();
    }
    return false;
  };

  onSubmit = (values) => {
    const { mode, user, createNewUser, updateSelectedUser } = this.props;
    const submitValues = { ...values, role: values.role.value };
    if (mode === ACTIONS.EDIT) {
      const {
        data: { id },
      } = user;
      updateSelectedUser({ ...submitValues, id });
    } else {
      createNewUser(submitValues);
    }
  };

  render() {
    const { mode, isOpen, toggle, user } = this.props;
    let initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      role: roleSelectOptions.find((role) => role.value === ROLES.CLIENT),
      status: STATUSES.INACTIVE,
    };
    if (mode === ACTIONS.EDIT && user.data) {
      initialValues = {
        ...user.data,
        password: '',
        phone: user.data.phone ? user.data.phone : '',
        role: roleSelectOptions.find((role) => role.value === user.data.role),
      };
    }

    return (
      <>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>
            <span>
              {mode === ACTIONS.CREATE ? 'Add New User' : 'Edit User'}
            </span>
          </ModalHeader>
          <ModalBody>
            <Formik
              innerRef={this.formRef}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={USER_SCHEMA(mode)}
              onSubmit={this.onSubmit}
            >
              {({ values, setFieldValue, setFieldTouched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row>
                    <Colxx xs="12" md="6" className="mb-2">
                      <FormGroup className="form-group has-float-label">
                        <Label>First Name</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="firstName"
                        />
                        <ErrorMessage
                          name="firstName"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xs="12" md="6" className="mb-2">
                      <FormGroup className="form-group has-float-label">
                        <Label>Last Name</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="lastName"
                        />
                        <ErrorMessage
                          name="lastName"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-float-label">
                        <Label>E-mail</Label>
                        <Field
                          className="form-control"
                          type="email"
                          name="email"
                        />
                        <ErrorMessage
                          name="email"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>Password</Label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-float-label">
                        <Label>Phone</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="phone"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-float-label">
                        <Label>Role</Label>
                        <FormikReactSelect
                          className="react-select"
                          name="role"
                          options={roleSelectOptions}
                          value={values.role}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="">
                        <Label className="d-block">Status</Label>
                        <FormikCustomRadioGroup
                          inline
                          name="status"
                          value={values.status}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={statusSelectOptions}
                        />
                      </FormGroup>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={toggle}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              className={`btn-shadow btn-multiple-state ${
                user.loading ? 'show-spinner' : ''
              }`}
              onClick={this.formSubmit}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Submit</span>
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

UserModal.propTypes = {
  user: PropTypes.object.isRequired,
  fetchSelectedUser: PropTypes.func.isRequired,
  createNewUser: PropTypes.func.isRequired,
  updateSelectedUser: PropTypes.func.isRequired,
  userId: PropTypes.number,
  mode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

UserModal.defaultProps = {
  userId: null,
  isOpen: false,
  toggle: () => {},
};

export default UserModal;
