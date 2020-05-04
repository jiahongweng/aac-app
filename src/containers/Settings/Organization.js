import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { UsaStates } from 'usa-states';
import { Row, Card, CardBody, FormGroup, Button, Label } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ORGANIZATION_SCHEMA, SUCCESS_MESSAGES } from 'utils/constants';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'components/form';
import { Breadcrumb } from 'components/navs';
import { updateOrganization } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import { organizationSettingMainSaga as saga } from './saga';

const usStates = new UsaStates();
const stateSelectOptions = usStates.states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

class Organization extends Component {
  componentDidUpdate(prevProps) {
    const { error, loading, data } = this.props.currentUser;
    const { loading: prevLoading } = prevProps.currentUser;
    if (error) {
      NotificationManager.error(error.message, 'Error');
    } else if (prevLoading && !loading && data) {
      NotificationManager.success(
        SUCCESS_MESSAGES.UPDATE_ORGANIZATION_SUCCESS,
        'Success',
      );
    }
  }

  onSubmit = (values) => {
    const {
      currentUser: {
        data: { id },
      },
      updateUserOrganization,
    } = this.props;
    const { name, location, shippingAddress } = values;
    location.state = location.state.value;
    shippingAddress.state = shippingAddress.state.value;
    updateUserOrganization({
      id,
      name,
      location,
      shippingAddress,
    });
  };

  render() {
    const {
      match,
      currentUser: {
        loading,
        data: { organization },
      },
    } = this.props;
    const initialValues = {
      name: get(organization, 'name') || '',
      location: {
        address1: get(organization, 'location.address1') || '',
        address2: get(organization, 'location.address2') || '',
        city: get(organization, 'location.city') || '',
        state: stateSelectOptions.find(
          (state) => state.value === get(organization, 'location.state'),
        ),
        zipCode: get(organization, 'location.zipCode') || '',
      },
      shippingAddress: {
        address1: get(organization, 'shippingAddress.address1') || '',
        address2: get(organization, 'shippingAddress.address2') || '',
        city: get(organization, 'shippingAddress.city') || '',
        state: stateSelectOptions.find(
          (state) => state.value === get(organization, 'shippingAddress.state'),
        ),
        zipCode: get(organization, 'shippingAddress.zipCode') || '',
      },
    };

    return (
      <>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="organization" match={match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx md="12" lg="9" xl="8" xxl="6">
            <Card className="d-flex flex-row mb-4">
              <CardBody>
                <Formik
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
                        <Colxx
                          xxs="12"
                          className="d-flex justify-content-end align-items-center"
                        >
                          <Button
                            type="submit"
                            color="primary"
                            className={`btn-shadow btn-multiple-state ${
                              loading ? 'show-spinner' : ''
                            }`}
                            size="lg"
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">Save</span>
                          </Button>
                        </Colxx>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </>
    );
  }
}

Organization.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateUserOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  updateUserOrganization: ({ id, name, location, shippingAddress }) =>
    dispatch(updateOrganization({ id, name, location, shippingAddress })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'organization', saga });

export default compose(withSaga, withConnect)(Organization);
