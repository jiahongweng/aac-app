import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import userListReducer from 'containers/UserList/reducer';
import userReducer from 'containers/User/reducer';
import organizationListReducer from 'containers/OrganizationList/reducer';
import organizationReducer from 'containers/Organization/reducer';
import productListReducer from 'containers/ProductList/reducer';
import productReducer from 'containers/Product/reducer';
import menuReducer from 'components/navs/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    userList: userListReducer,
    user: userReducer,
    organizationList: organizationListReducer,
    organization: organizationReducer,
    productList: productListReducer,
    product: productReducer,
    menu: menuReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
