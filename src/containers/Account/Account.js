import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  FormGroup,
  Button,
  Label,
} from 'reactstrap';
import Avatar from 'react-avatar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ACCOUNT_SCHEMA, SUCCESS_MESSAGES } from 'utils/constants';
import { NotificationManager } from 'components/common/notifications';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';
import { ThumbnailImage } from 'components/others';

class Account extends Component {
  componentDidUpdate(prevProps) {
    const { error, loading, data } = this.props.currentUser;
    const { loading: prevLoading } = prevProps.currentUser;
    if (error) {
      NotificationManager.error(error.message, 'Error');
    } else if (prevLoading && !loading && data) {
      NotificationManager.success(
        SUCCESS_MESSAGES.UPDATE_ACCOUNT_SUCCESS,
        'Success',
      );
    }
  }

  onSubmit = (values) => {
    const {
      currentUser: {
        data: { id },
      },
      updateUserAccount,
    } = this.props;
    const { firstName, lastName, phone, password, oldPassword } = values;
    updateUserAccount({
      id,
      firstName,
      lastName,
      phone,
      password,
      oldPassword,
    });
  };

  render() {
    const {
      match,
      currentUser: {
        loading,
        data: { firstName, lastName, phone, img = null },
      },
    } = this.props;
    const initialValues = {
      firstName,
      lastName,
      phone,
      oldPassword: '',
      password: '',
      confirmPassword: '',
    };
    return (
      <>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="account" match={match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx md="12" lg="9" xl="8" xxl="6">
            <Card className="d-flex flex-row mb-4">
              <CardBody>
                <div className="text-center p-4">
                  {img ? (
                    <ThumbnailImage
                      rounded
                      large
                      src="/assets/img/profile-pic-l.jpg"
                      alt="profile"
                    />
                  ) : (
                    <Avatar
                      name={`${firstName} ${lastName}`}
                      size="125"
                      round
                    />
                  )}
                </div>
                <CardSubtitle className="text-primary text-center mb-1">{`${firstName} ${lastName}`}</CardSubtitle>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={ACCOUNT_SCHEMA}
                  onSubmit={this.onSubmit}
                >
                  {() => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <Row>
                        <Colxx xxs="12">
                          <p className="font-weight-semibold text-muted text-small my-3">
                            General info
                          </p>
                        </Colxx>
                        <Colxx xs="12" md="6" className="mb-2">
                          <FormGroup className="form-group has-top-label">
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
                          <FormGroup className="form-group has-top-label">
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
                          <FormGroup className="form-group has-top-label">
                            <Label>Phone</Label>
                            <Field
                              className="form-control"
                              type="text"
                              name="phone"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12">
                          <p className="font-weight-semibold text-muted text-small my-3">
                            Change password
                          </p>
                        </Colxx>
                        <Colxx xxs="12">
                          <FormGroup className="form-group has-top-label">
                            <Label>Confirm current password</Label>
                            <Field
                              className="form-control"
                              type="password"
                              name="oldPassword"
                            />
                            <ErrorMessage
                              name="oldPassword"
                              className="invalid-feedback d-block"
                              component="div"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12">
                          <FormGroup className="form-group has-top-label">
                            <Label>New password</Label>
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
                        <Colxx xxs="12">
                          <FormGroup className="form-group has-top-label">
                            <Label>Confirm new password</Label>
                            <Field
                              className="form-control"
                              type="password"
                              name="confirmPassword"
                            />
                            <ErrorMessage
                              name="confirmPassword"
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

Account.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateUserAccount: PropTypes.func.isRequired,
};

export default Account;
