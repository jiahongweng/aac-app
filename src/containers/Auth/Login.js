import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login, googleLogin } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { LOGIN_SCHEMA } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { loginMainSaga as saga } from './saga';

class Login extends Component {
  onGoogleLogin = (response) => {
    const { googleLoginUser } = this.props;
    const { id_token: idToken } = response.getAuthResponse();

    googleLoginUser({ idToken });
  };

  onUserLogin = (values) => {
    const {
      currentUser: { loading },
      loginUser,
    } = this.props;
    const { email, password } = values;
    if (!loading) {
      if (!isEmpty(email) && !isEmpty(password)) {
        loginUser({ email, password });
      }
    }
  };

  componentDidUpdate() {
    const { error } = this.props.currentUser;
    if (error) {
      NotificationManager.error(error.message, 'Login Error');
    }
  }

  render() {
    const initialValues = {
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
                Please use your credentials to login. <br />
                If you are not a member, please{' '}
                <NavLink to="/register" className="text-primary">
                  register
                </NavLink>
                .
              </p>
            </div>

            <div className="form-side">
              <NavLink to="/" className="white">
                <span className="logo-single mb-4" />
              </NavLink>
              <div className="w-100 text-center">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  onSuccess={this.onGoogleLogin}
                  theme="dark"
                  cookiePolicy="single_host_origin"
                >
                  <span className="mx-5">Sign in with Google</span>
                </GoogleLogin>
              </div>
              <CardTitle className="text-center font-weight-semibold my-4">
                Or sign in with your email
              </CardTitle>
              <Formik
                initialValues={initialValues}
                validationSchema={LOGIN_SCHEMA}
                onSubmit={this.onUserLogin}
              >
                {() => (
                  <Form className="av-tooltip tooltip-label-bottom">
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

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/forgot-password">Forgot password?</NavLink>
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
                        <span className="label">LOGIN</span>
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

Login.propTypes = {
  currentUser: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  googleLoginUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: ({ email, password }) => dispatch(login({ email, password })),
  googleLoginUser: ({ idToken }) => dispatch(googleLogin({ idToken })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withSaga, withConnect)(Login);
