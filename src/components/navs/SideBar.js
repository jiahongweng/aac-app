/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from './actions';
import {
  makeSelectContainerClassnames,
  makeSelectMenuClickCount,
  makeSelectMenuHasSubItems,
} from './selectors';
import {
  MENU_ITEMS,
  SUB_HIDDEN_BREAKPOINT,
  MENU_HIDDEN_BREAKPOINT,
} from './constants';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
      collapsedMenus: [],
    };
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }

    const { containerClassnames } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);

    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems,
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();

    let isMenuClick = false;

    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile',
        ))
    ) {
      isMenuClick = true;
    }

    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }

    this.setState({
      viewingParentMenu: '',
    });

    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;

    if (windowWidth < MENU_HIDDEN_BREAKPOINT) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < SUB_HIDDEN_BREAKPOINT) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');

      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');

      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }

    return nextClasses;
  };

  // eslint-disable-next-line react/no-find-dom-node
  getContainer = () => ReactDOM.findDOMNode(this);

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';

    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }

    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems,
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true),
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true),
    );
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active');

    if (oldli != null) {
      oldli.classList.remove('active');
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active');

    if (oldliSub != null) {
      oldliSub.classList.remove('active');
    }

    /* set selected parent menu */
    const selectedSublink = document.querySelector(
      '.third-level-menu  a.active',
    );

    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add('active');
    }

    const selectedlink = document.querySelector('.sub-menu  a.active');

    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active');

      this.setState(
        {
          selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
            'data-parent',
          ),
        },
        callback,
      );
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active',
      );

      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu: selectedParentNoSubItem.getAttribute(
              'data-flag',
            ),
          },
          callback,
        );
      } else if (this.state.selectedParentMenu === '') {
        this.setState(
          {
            selectedParentMenu: MENU_ITEMS[0].id,
          },
          callback,
        );
      }
    }
  };

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state;
    const menuItem = MENU_ITEMS.find((x) => x.id === selectedParentMenu);
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);
    return false;
  };

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);
      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive(this.setHasSubItemStatus);
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.id;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.props.changeSelectedMenuHasSubItems(hasSubMenu);

    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();
      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames,
        );
      }

      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();
    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  render() {
    const {
      selectedParentMenu,
      viewingParentMenu,
      collapsedMenus,
    } = this.state;
    const {
      currentUser: {
        data: { role },
      },
    } = this.props;

    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {MENU_ITEMS &&
                  MENU_ITEMS.filter(
                    (item) =>
                      !item.permission || item.permission.includes(role),
                  ).map((item) => (
                    <NavItem
                      key={item.id}
                      className={classnames({
                        active:
                          (selectedParentMenu === item.id &&
                            viewingParentMenu === '') ||
                          viewingParentMenu === item.id,
                      })}
                    >
                      {item.newWindow ? (
                        <a
                          href={item.to}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <i className={item.icon} />
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        <NavLink
                          to={item.to}
                          onClick={(e) => this.openSubMenu(e, item)}
                          data-flag={item.id}
                        >
                          <i className={item.icon} />
                          <span>{item.label}</span>
                        </NavLink>
                      )}
                    </NavItem>
                  ))}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {MENU_ITEMS &&
                MENU_ITEMS.map((item) => (
                  <Nav
                    key={item.id}
                    className={classnames({
                      'd-block':
                        (this.state.selectedParentMenu === item.id &&
                          this.state.viewingParentMenu === '') ||
                        this.state.viewingParentMenu === item.id,
                    })}
                    data-parent={item.id}
                  >
                    {item.subs &&
                      item.subs.map((sub, index) => (
                        <NavItem
                          key={`${item.id}_${index}`}
                          className={`${
                            sub.subs && sub.subs.length > 0
                              ? 'has-sub-item'
                              : ''
                          }`}
                        >
                          {sub.newWindow ? (
                            <a
                              href={sub.to}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <i className={sub.icon} />
                              <span>{sub.label}</span>
                            </a>
                          ) : sub.subs && sub.subs.length > 0 ? (
                            <>
                              <NavLink
                                className={`rotate-arrow-icon opacity-50 ${
                                  collapsedMenus.indexOf(
                                    `${item.id}_${index}`,
                                  ) === -1
                                    ? ''
                                    : 'collapsed'
                                }`}
                                to={sub.to}
                                id={`${item.id}_${index}`}
                                onClick={(e) =>
                                  this.toggleMenuCollapse(
                                    e,

                                    `${item.id}_${index}`,
                                  )
                                }
                              >
                                <i className="simple-icon-arrow-down" />{' '}
                                <span>{sub.label}</span>
                              </NavLink>

                              <Collapse
                                isOpen={
                                  collapsedMenus.indexOf(
                                    `${item.id}_${index}`,
                                  ) === -1
                                }
                              >
                                <Nav className="third-level-menu">
                                  {sub.subs.map((thirdSub, thirdIndex) => (
                                    <NavItem
                                      key={`${item.id}_${index}_${thirdIndex}`}
                                    >
                                      {thirdSub.newWindow ? (
                                        <a
                                          href={thirdSub.to}
                                          rel="noopener noreferrer"
                                          target="_blank"
                                        >
                                          <i className={thirdSub.icon} />{' '}
                                          <span>{thirdSub.label}</span>
                                        </a>
                                      ) : (
                                        <NavLink to={thirdSub.to}>
                                          <i className={thirdSub.icon} />{' '}
                                          <span>{thirdSub.label}</span>
                                        </NavLink>
                                      )}
                                    </NavItem>
                                  ))}
                                </Nav>
                              </Collapse>
                            </>
                          ) : (
                            <NavLink to={sub.to}>
                              <i className={sub.icon} />
                              <span>{sub.label}</span>
                            </NavLink>
                          )}
                        </NavItem>
                      ))}
                  </Nav>
                ))}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  containerClassnames: PropTypes.string.isRequired,
  menuClickCount: PropTypes.number.isRequired,
  selectedMenuHasSubItems: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  setContainerClassnames: PropTypes.func.isRequired,
  addContainerClassname: PropTypes.func.isRequired,
  changeDefaultClassnames: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  changeSelectedMenuHasSubItems: PropTypes.func.isRequired,
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
  addContainerClassname: (classname, strCurrentClasses) =>
    dispatch(addContainerClassname(classname, strCurrentClasses)),
  changeDefaultClassnames: (strCurrentClasses) =>
    dispatch(changeDefaultClassnames(strCurrentClasses)),
  changeSelectedMenuHasSubItems: (payload) =>
    dispatch(changeSelectedMenuHasSubItems(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(Sidebar);
