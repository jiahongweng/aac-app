import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from 'components/common/notifications';
import { Colxx } from 'components/common/CustomBootstrap';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onUserRegister = (values) => {
    const { currentUser, registerUser } = this.props;
    if (!currentUser.loading) {
      if (
        values.email !== '' &&
        values.password !== '' /* && values.name !== '' */
      ) {
        registerUser(values);
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

  validateName = (value) => {
    let error;

    if (!value) {
      error = 'Please enter your name';
    } else if (value.length < 9) {
      error = 'Value must be longer than 8 characters';
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
    const { name, email, password } = this.state;
    const initialValues = { name, email, password };
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
                <NavLink to="/login" className="text-primry">
                  login
                </NavLink>
                .
              </p>
            </div>

            <div className="form-side">
              <NavLink to="/" className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">Register</CardTitle>
              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserRegister}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    {/* <FormGroup className="form-group has-float-label">
                      <Label>Full Name</Label>
                      <Field
                        className="form-control"
                        name="name"
                        validate={this.validateName}
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      )}
                    </FormGroup> */}

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
};

export default Register;
