import React, { Component } from 'react';
import { Row, Card, CardTitle, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import { ERROR_MESSAGES } from 'utils/constants';

class NotFound extends Component {
  componentDidMount() {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');
  }

  componentWillUnmount() {
    document.body.classList.remove('background');
    document.body.classList.remove('no-footer');
  }

  render() {
    return (
      <>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-primary h2 text-uppercase">
                      Elevate your chapter
                    </p>
                    <p className="text-secondary mb-0">Yes, it is indeed!</p>
                  </div>
                  <div className="form-side">
                    <NavLink to="/" className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      {ERROR_MESSAGES.NOT_FOUND_PAGE_TITILE}
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      {ERROR_MESSAGES.NOT_FOUND_PAGE_CONTENT}
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/dashboard"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      GO BACK HOME
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </>
    );
  }
}

export default NotFound;
