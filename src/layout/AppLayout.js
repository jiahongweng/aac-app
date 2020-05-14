import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { TopNav, SideBar, Footer } from 'components/navs';
import { makeSelectContainerClassnames } from 'components/navs/selectors';

class AppLayout extends Component {
  componentDidMount() {
    document.body.classList.add('rounded');
  }

  componentWillUnmount() {
    document.body.classList.remove('rounded');
  }

  render() {
    const {
      containerClassnames,
      currentUser: { data: currentUserData },
    } = this.props;

    return (
      <div id="app-container" className={containerClassnames}>
        {currentUserData && (
          <>
            <TopNav history={this.props.history} />
            <SideBar />
          </>
        )}
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
        <Footer />
      </div>
    );
  }
}

AppLayout.propTypes = {
  containerClassnames: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};

const mapStateToProps = createStructuredSelector({
  containerClassnames: makeSelectContainerClassnames(),
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(AppLayout);
