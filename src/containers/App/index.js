import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import NotificationContainer from 'components/common/notifications/NotificationContainer';
import routes from './routes';
import { makeSelectIsAuthenticated } from './selectors';

const App = ({ isAuthenticated }) => (
  <div className="h-100">
    <NotificationContainer />
    <Helmet>
      <meta name="description" content="AAC" />
      <title>AAC</title>
    </Helmet>
    {routes(isAuthenticated)}
  </div>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});
const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(App);
