import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { WithWizard } from 'react-albus';
import { NavLink } from 'react-router-dom';

class WizardTopNav extends Component {
  getClassName = (steps, step, index, stepItem) => {
    if (steps.indexOf(step) === index) {
      return 'step-doing';
    }
    if (steps.indexOf(step) > index || stepItem.isDone) {
      // eslint-disable-next-line no-param-reassign
      stepItem.isDone = true;

      return 'step-done';
    }

    return '';
  };

  itemClick = (stepItem, push) => {
    const { disableNav, topNavClick } = this.props;

    if (disableNav) {
      return;
    }

    topNavClick(stepItem, push);
  };

  render() {
    const { disableNav, className } = this.props;

    return (
      <WithWizard
        render={({ step, steps, push }) => (
          <ul
            className={`nav nav-tabs nav-wizard ${className}${
              disableNav ? ' disabled' : ''
            }`}
          >
            {steps.map((stepItem, index) =>
              stepItem.hideTopNav ? (
                <Fragment key={index} />
              ) : (
                <li
                  key={index}
                  className={`nav-item ${this.getClassName(
                    steps,
                    step,
                    index,
                    stepItem,
                  )}`}
                >
                  <NavLink
                    to="#"
                    location={{}}
                    className="nav-link"
                    onClick={() => this.itemClick(stepItem, push)}
                  >
                    <span>{stepItem.name}</span>
                    <small>{stepItem.desc}</small>
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        )}
      />
    );
  }
}

WizardTopNav.propTypes = {
  disableNav: PropTypes.bool.isRequired,
  topNavClick: PropTypes.func,
  className: PropTypes.string,
};

WizardTopNav.defaultProps = {
  topNavClick: () => {},
  className: '',
};

export default WizardTopNav;
