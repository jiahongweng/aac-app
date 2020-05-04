import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { LOGIN_SCHEMA } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import saga from './saga';

class Login extends Component {
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
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">Login</CardTitle>
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
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: ({ email, password }) => dispatch(login({ email, password })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withSaga, withConnect)(Login);
