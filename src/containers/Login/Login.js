import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onUserLogin = (values) => {
    const { currentUser, loginUser } = this.props;
    if (!currentUser.loading) {
      if (values.email !== '' && values.password !== '') {
        loginUser(values);
      }
    }
  };

  validateEmail = (value) => {
    let error;

    if (!value) {
      error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }

    return error;
  };

  validatePassword = (value) => {
    let error;

    if (!value) {
      error = 'Please enter your password';
    } else if (value.length < 4) {
      error = 'Value must be longer than 3 characters';
    }

    return error;
  };

  componentDidUpdate() {
    const { error } = this.props.currentUser;
    if (error) {
      NotificationManager.error(
        error.message,
        'Login Error',
        3000,
        null,
        null,
        '',
      );
    }
  }

  render() {
    const { email, password } = this.state;
    const initialValues = { email, password };
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
              <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>E-mail</Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label>Password</Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/user/forgot-password">
                        Forgot password?
                      </NavLink>
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

export default Login;
