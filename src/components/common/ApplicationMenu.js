import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { NavLink } from 'reactstrap';

class ApplicationMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleDocumentClick = (e) => {
    // eslint-disable-next-line react/no-find-dom-node
    const container = ReactDOM.findDOMNode(this);

    if (container.contains(e.target) || container === e.target) {
      return;
    }

    this.toggle(e);
  };

  toggle = (e) => {
    e.preventDefault();

    const { isOpen } = this.state;

    if (!isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
    this.setState({
      isOpen: !isOpen,
    });
  };

  componentWillUnmount() {
    this.removeEvents();
  }

  addEvents() {
    ['click', 'touchstart'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true),
    );
  }

  removeEvents() {
    ['click', 'touchstart'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true),
    );
  }

  render() {
    return (
      <div className={`app-menu ${this.state.isOpen ? 'shown' : ''}`}>
        {this.props.children}

        <NavLink
          className="app-menu-button d-inline-block d-xl-none"
          onClick={this.toggle}
        >
          <i className="simple-icon-options" />
        </NavLink>
      </div>
    );
  }
}

ApplicationMenu.propTypes = {
  children: PropTypes.node,
};

ApplicationMenu.defaultProps = {
  children: null,
};

export default ApplicationMenu;
