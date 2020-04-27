import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AUTH_SCHEMA } from 'utils/constants';
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

  componentDidUpdate() {
    const { error } = this.props.currentUser;
    if (error) {
      NotificationManager.error(error.message, 'Signup Error');
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
                <NavLink to="/login" className="text-primary">
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
                validationSchema={AUTH_SCHEMA}
                onSubmit={this.onUserRegister}
              >
                {() => (
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
