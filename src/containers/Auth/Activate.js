import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { activateAccount } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { SUCCESS_MESSAGES } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { NotificationManager } from 'components/common/notifications';
import { activateMainSaga as saga } from './saga';

class Activate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activating: true,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { code: verificationCode },
      },
      activate,
    } = this.props;

    activate({ verificationCode });
  }

  componentDidUpdate(prevProps) {
    const { loading: prevLoading } = prevProps.currentUser;
    const { error, loading } = this.props.currentUser;

    if (prevLoading && !loading) {
      if (error) {
        NotificationManager.error(error.message, 'Error', 10000);
      } else {
        NotificationManager.success(
          SUCCESS_MESSAGES.ACTIVATION_SUCCESS,
          'Success',
          10000,
        );
      }

      this.completeActivation();
    }
  }

  completeActivation = () => {
    this.setState({ activating: false });
  };

  render() {
    const { activating } = this.state;

    if (!activating) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return <div className="loading" />;
  }
}

Activate.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  activate: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  activate: ({ verificationCode }) =>
    dispatch(activateAccount({ verificationCode })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'activate', saga });

export default compose(withSaga, withConnect)(Activate);
