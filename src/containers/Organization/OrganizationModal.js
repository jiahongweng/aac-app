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
import { get } from 'lodash';
import { UsaStates } from 'usa-states';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ORGANIZATION_SCHEMA, ACTIONS } from 'utils/constants';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'components/form';

const usStates = new UsaStates();
const stateSelectOptions = usStates.states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

class OrganizationModal extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef();
    this.state = {
      submiting: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      organization: { loading: prevLoading },
    } = prevProps;
    const {
      isOpen,
      organization: { loading, error },
      toggle,
    } = this.props;
    const { submiting } = this.state;

    if (isOpen) {
      if (error) {
        NotificationManager.error(error.message, 'Error');
      } else if (prevLoading && !loading && submiting) {
        toggle(true);
      }
    }
    return false;
  }

  onOpened = () => {
    const { mode, fetchSelectedOrganization, organizationId } = this.props;

    if (mode === ACTIONS.EDIT) {
      fetchSelectedOrganization({ id: organizationId });
    }

    this.setState({ submiting: false });
  };

  onClosed = () => {
    const { initOrganization } = this.props;

    this.setState({ submiting: false });
    initOrganization();
  };

  formSubmit = (e) => {
    e.preventDefault();
    if (this.formRef.current && this.formRef.current.handleSubmit) {
      return this.formRef.current.submitForm();
    }
    return false;
  };

  onSubmit = (values) => {
    const {
      mode,
      organizationId,
      createNewOrganization,
      updateSelectedOrganization,
    } = this.props;
    const { name, location, shippingAddress } = values;

    location.state = location.state.value;
    shippingAddress.state = shippingAddress.state.value;

    if (mode === ACTIONS.EDIT) {
      updateSelectedOrganization({
        id: organizationId,
        name,
        location,
        shippingAddress,
      });
    } else {
      createNewOrganization({ userId: 0, name, location, shippingAddress });
    }

    this.setState({ submiting: true });
  };

  render() {
    const { mode, isOpen, toggle, organization } = this.props;
    const initialValues = {
      name: get(organization, 'data.name') || '',
      location: {
        address1: get(organization, 'data.location.address1') || '',
        address2: get(organization, 'data.location.address2') || '',
        city: get(organization, 'data.location.city') || '',
        state: stateSelectOptions.find(
          (state) => state.value === get(organization, 'data.location.state'),
        ),
        zipCode: get(organization, 'data.location.zipCode') || '',
      },
      shippingAddress: {
        address1: get(organization, 'data.shippingAddress.address1') || '',
        address2: get(organization, 'data.shippingAddress.address2') || '',
        city: get(organization, 'data.shippingAddress.city') || '',
        state: stateSelectOptions.find(
          (state) =>
            state.value === get(organization, 'data.shippingAddress.state'),
        ),
        zipCode: get(organization, 'data.shippingAddress.zipCode') || '',
      },
    };

    return (
      <>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          onOpened={this.onOpened}
          onClosed={this.onClosed}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={toggle}>
            <span>
              {mode === ACTIONS.CREATE
                ? 'Add New Organization'
                : 'Edit Organization'}
            </span>
          </ModalHeader>
          <ModalBody>
            <Formik
              innerRef={this.formRef}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={ORGANIZATION_SCHEMA}
              onSubmit={this.onSubmit}
            >
              {({ values, setFieldValue, setFieldTouched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Name</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="name"
                        />
                        <ErrorMessage
                          name="name"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12">
                      <p className="font-weight-semibold text-muted text-small my-3">
                        Location
                      </p>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Address</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="location.address1"
                        />
                        <ErrorMessage
                          name="location.address1"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Address 2</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="location.address2"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="5" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>City</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="location.city"
                        />
                        <ErrorMessage
                          name="location.city"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="4" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>State</Label>
                        <FormikReactSelect
                          className="react-select"
                          name="location.state"
                          options={stateSelectOptions}
                          value={values.location.state}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        <ErrorMessage
                          name="location.state"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="3" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Zip</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="location.zipCode"
                        />
                        <ErrorMessage
                          name="location.zipCode"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12">
                      <p className="font-weight-semibold text-muted text-small my-3">
                        Shipping Address
                      </p>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Address</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="shippingAddress.address1"
                        />
                        <ErrorMessage
                          name="shippingAddress.address1"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Address 2</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="shippingAddress.address2"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="5" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>City</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="shippingAddress.city"
                        />
                        <ErrorMessage
                          name="shippingAddress.city"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="4" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>State</Label>
                        <FormikReactSelect
                          className="react-select"
                          name="shippingAddress.state"
                          options={stateSelectOptions}
                          value={values.shippingAddress.state}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        <ErrorMessage
                          name="shippingAddress.state"
                          className="invalid-feedback d-block"
                          component="div"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm="3" className="mb-2">
                      <FormGroup className="form-group has-top-label">
                        <Label>Zip</Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="shippingAddress.zipCode"
                        />
                        <ErrorMessage
                          name="shippingAddress.zipCode"
                          className="invalid-feedback d-block"
                          component="div"
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
                organization.loading ? 'show-spinner' : ''
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

OrganizationModal.propTypes = {
  organization: PropTypes.object.isRequired,
  initOrganization: PropTypes.func.isRequired,
  fetchSelectedOrganization: PropTypes.func.isRequired,
  createNewOrganization: PropTypes.func.isRequired,
  updateSelectedOrganization: PropTypes.func.isRequired,
  organizationId: PropTypes.number,
  mode: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

OrganizationModal.defaultProps = {
  organizationId: null,
  isOpen: false,
  toggle: () => {},
};

export default OrganizationModal;
