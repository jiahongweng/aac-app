import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { ReactIntercom } from 'react-intercom';
import NotificationContainer from 'components/common/notifications/NotificationContainer';
import routes from './routes';
import { makeSelectIsAuthenticated, makeSelectCurrentUser } from './selectors';

const App = ({ isAuthenticated, currentUser: { data: currentUserData } }) => (
  <div className="h-100">
    <NotificationContainer />
    <Helmet>
      <meta name="description" content="AAC" />
      <title>AAC</title>
    </Helmet>
    {isAuthenticated && currentUserData && (
      <ReactIntercom
        app_id={process.env.REACT_APP_INTERCOM_ID}
        user_id={currentUserData.id}
        email={currentUserData.email}
        name={`${currentUserData.firstName} ${currentUserData.lastName}`}
      />
    )}
    {routes(isAuthenticated)}
  </div>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(App);
