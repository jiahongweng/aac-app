import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { register, googleRegister } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { REGISTER_SCHEMA, SUCCESS_MESSAGES } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { registerMainSaga as saga } from './saga';

class Register extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }

  onGoogleSignup = (response) => {
    const { googleRegisterUser } = this.props;
    const { id_token: idToken } = response.getAuthResponse();

    googleRegisterUser({ idToken });
  };

  onUserRegister = (values) => {
    const {
      currentUser: { loading },
      registerUser,
    } = this.props;
    const { firstName, lastName, email, password } = values;
    if (!loading) {
      if (
        !isEmpty(firstName) &&
        !isEmpty(lastName) &&
        !isEmpty(email) &&
        !isEmpty(password)
      ) {
        registerUser({ firstName, lastName, email, password });
      }
    }
  };

  componentDidUpdate(prevProps) {
    const { loading: prevLoading } = prevProps.currentUser;
    const { error, loading } = this.props.currentUser;
    if (error) {
      NotificationManager.error(error.message, 'Signup Error');
    } else if (
      prevLoading &&
      !loading &&
      this.formRef.current &&
      this.formRef.current.isSubmitting
    ) {
      NotificationManager.success(
        SUCCESS_MESSAGES.REGISTER_SUCCESS,
        'Success',
        10000,
      );
    }
  }

  render() {
    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
                Please use this form to register. <br />
                If you are a member, please{' '}
                <NavLink to="/login" className="text-primary">
                  login
                </NavLink>
                .
              </p>
            </div>

            <div className="form-side">
              <NavLink to="/" className="white">
                <span className="logo-single mb-5" />
              </NavLink>
              <div className="w-100 text-center">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  onSuccess={this.onGoogleSignup}
                  theme="dark"
                  cookiePolicy="single_host_origin"
                >
                  <span className="mx-5">Sign up with Google</span>
                </GoogleLogin>
              </div>
              <CardTitle className="text-center font-weight-semibold my-4">
                Or sign up with your email
              </CardTitle>
              <Formik
                innerRef={this.formRef}
                initialValues={initialValues}
                validationSchema={REGISTER_SCHEMA}
                onSubmit={this.onUserRegister}
              >
                {() => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Row>
                      <Colxx xs="12" md="6">
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
                      <Colxx xs="12" md="6">
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
                      <Colxx xxs="12">
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
                      </Colxx>
                      <Colxx xxs="12">
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
                      <Colxx xxs="12">
                        <div className="d-flex justify-content-end align-items-center">
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
                            <span className="label">REGISTER</span>
                          </Button>
                        </div>
                      </Colxx>
                    </Row>
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

Register.propTypes = {
  currentUser: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  googleRegisterUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  registerUser: ({ firstName, lastName, email, password }) =>
    dispatch(register({ firstName, lastName, email, password })),
  googleRegisterUser: ({ idToken }) => dispatch(googleRegister({ idToken })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'register', saga });

export default compose(withSaga, withConnect)(Register);
