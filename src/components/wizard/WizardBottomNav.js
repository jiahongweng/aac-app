import React from 'react';
import PropTypes from 'prop-types';
import { WithWizard } from 'react-albus';
import { Button } from 'reactstrap';

const WizardBottomNav = ({
  onClickPrev,
  onClickNext,
  prevLabel,
  nextLabel,
  className,
}) => (
  <WithWizard
    render={({ next, previous, step, steps }) => (
      <div className={`wizard-buttons ${className}`}>
        <Button
          color="primary"
          className={`mr-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
          onClick={() => onClickPrev(previous, steps, step)}
          size="lg"
        >
          {prevLabel}
        </Button>

        <Button
          color="primary"
          className={steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''}
          onClick={() => onClickNext(next, steps, step)}
          size="lg"
        >
          {nextLabel}
        </Button>
      </div>
    )}
  />
);

WizardBottomNav.propTypes = {
  className: PropTypes.string,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
};

WizardBottomNav.defaultProps = {
  className: '',
  prevLabel: 'Back',
  nextLabel: 'Next',
  onClickPrev: () => {},
  onClickNext: () => {},
};

export default WizardBottomNav;
