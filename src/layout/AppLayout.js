import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { TopNav, SideBar, Footer } from 'components/navs';

class AppLayout extends Component {
  componentDidMount() {
    document.body.classList.add('rounded');
  }

  componentWillUnmount() {
    document.body.classList.remove('rounded');
  }

  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <SideBar />
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
  history: PropTypes.object.isRequired,
  children: PropTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(AppLayout);
