import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from './configureStore';

const App = React.lazy(() =>
  import(/* webpackChunkName: "App" */ 'containers/App'),
);
const initialState = {};
const store = configureStore(initialState, history);

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </ConnectedRouter>
  </Provider>
);
