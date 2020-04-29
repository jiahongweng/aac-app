import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Avatar from 'react-avatar';
import { createStructuredSelector } from 'reselect';
import { MobileMenuIcon, MenuIcon } from 'components/svg';
import { logout } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import TopnavNotifications from './TopNav.Notifications';
import { setContainerClassnames, clickOnMobileMenu } from './actions';
import {
  makeSelectContainerClassnames,
  makeSelectMenuClickCount,
  makeSelectMenuHasSubItems,
} from './selectors';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
    };
  }

  isInFullScreen = () =>
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();
    const docElm = document.documentElement;

    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();
    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      // eslint-disable-next-line no-param-reassign
      ++menuClickCount, // eslint-disable-line no-plusplus
      containerClassnames,
      this.props.selectedMenuHasSubItems,
    );
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const {
      containerClassnames,
      menuClickCount,
      currentUser: {
        data: { firstName, lastName },
      },
    } = this.props;
    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={(e) =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
        </div>

        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="navbar-right">
          <div className="header-icons d-inline-block align-middle">
            <TopnavNotifications />
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>

          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{`${firstName} ${lastName}`}</span>
                <span>
                  <Avatar name={`${firstName} ${lastName}`} size="40" round />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem tag={Link} to="/account">
                  Account
                </DropdownItem>
                {/* <DropdownItem>Features</DropdownItem>
                <DropdownItem>History</DropdownItem>
                <DropdownItem>Support</DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

TopNav.propTypes = {
  containerClassnames: PropTypes.string.isRequired,
  menuClickCount: PropTypes.number.isRequired,
  selectedMenuHasSubItems: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  setContainerClassnames: PropTypes.func.isRequired,
  clickOnMobileMenu: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  containerClassnames: makeSelectContainerClassnames(),
  menuClickCount: makeSelectMenuClickCount(),
  selectedMenuHasSubItems: makeSelectMenuHasSubItems(),
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  setContainerClassnames: (
    clickIndex,
    strCurrentClasses,
    selectedMenuHasSubItems,
  ) =>
    dispatch(
      setContainerClassnames(
        clickIndex,
        strCurrentClasses,
        selectedMenuHasSubItems,
      ),
    ),
  clickOnMobileMenu: (strCurrentClasses) =>
    dispatch(clickOnMobileMenu(strCurrentClasses)),
  logoutUser: () => dispatch(logout()),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(TopNav);
