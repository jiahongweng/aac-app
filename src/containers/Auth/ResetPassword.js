import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPassword } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { RESET_PASSWORD_SCHEMA, SUCCESS_MESSAGES } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import saga from './saga';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }

  onResetPassword = (values) => {
    const {
      match: {
        params: { token },
      },
      currentUser: { loading },
      resetUserPassword,
    } = this.props;
    const { password } = values;
    if (!loading) {
      if (!isEmpty(token) && !isEmpty(password)) {
        resetUserPassword({ token, password });
      }
    }
  };

  componentDidUpdate(prevProps) {
    const { loading: prevLoading } = prevProps.currentUser;
    const { error, loading } = this.props.currentUser;
    if (error) {
      NotificationManager.error(error.message, 'Error');
    } else if (
      prevLoading &&
      !loading &&
      this.formRef.current &&
      this.formRef.current.isSubmitting
    ) {
      NotificationManager.success(
        SUCCESS_MESSAGES.RESET_PASSWORD_SUCCESS,
        'Success',
        10000,
      );
      this.props.history.push('/');
    }
  }

  render() {
    const initialValues = {
      password: '',
      confirmPassword: '',
    };
    const { loading } = this.props.currentUser;

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-primary h2 text-uppercase">
                Elevate your chapter
              </p>
              <p className="text-secondary mb-0">
                Enter the password to reset. <br />
                If you are not a member, please{' '}
                <NavLink to="/register" className="text-primary">
                  register
                </NavLink>
                .
              </p>
            </div>

            <div className="form-side">
              <NavLink to="/" className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">Reset Password</CardTitle>
              <Formik
                innerRef={this.formRef}
                initialValues={initialValues}
                validationSchema={RESET_PASSWORD_SCHEMA}
                onSubmit={this.onResetPassword}
              >
                {() => (
                  <Form className="av-tooltip tooltip-label-bottom">
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

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/login">Already have an account?</NavLink>
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
                        <span className="label">RESET</span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  resetUserPassword: ({ token, password }) =>
    dispatch(resetPassword({ token, password })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'reset', saga });

export default compose(withSaga, withConnect)(ResetPassword);
