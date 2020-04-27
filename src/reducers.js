import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import userListReducer from 'containers/UserList/reducer';
import userReducer from 'containers/User/reducer';
import menuReducer from 'components/navs/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    userList: userListReducer,
    user: userReducer,
    menu: menuReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
