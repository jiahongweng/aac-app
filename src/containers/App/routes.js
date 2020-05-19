/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { UserLayout, AppLayout } from 'layout';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ 'containers/Auth/Login'),
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-rgister" */ 'containers/Auth/Register'),
);
const Activate = React.lazy(() =>
  import(/* webpackChunkName: "user-activate" */ 'containers/Auth/Activate'),
);
const ForgotPassword = React.lazy(() =>
  import(
    /* webpackChunkName: "user-forgot-password" */ 'containers/Auth/ForgotPassword'
  ),
);
const ResetPassword = React.lazy(() =>
  import(
    /* webpackChunkName: "user-reset-password" */ 'containers/Auth/ResetPassword'
  ),
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "app-dashboard" */ 'containers/Dashboard'),
);
const UserList = React.lazy(() =>
  import(/* webpackChunkName: "app-userlist" */ 'containers/UserList'),
);
const OrganizationList = React.lazy(() =>
  import(
    /* webpackChunkName: "app-organizationlist" */ 'containers/OrganizationList'
  ),
);
const ProductList = React.lazy(() =>
  import(/* webpackChunkName: "app-productlist" */ 'containers/ProductList'),
);
const AddProducts = React.lazy(() =>
  import(
    /* webpackChunkName: "app-addProducts" */ 'containers/ProductList/AddProducts'
  ),
);
const OrderList = React.lazy(() =>
  import(/* webpackChunkName: "app-orderlist" */ 'containers/OrderList'),
);
const Account = React.lazy(() =>
  import(
    /* webpackChunkName: "settings-account" */ 'containers/Settings/Account'
  ),
);
const Organization = React.lazy(() =>
  import(
    /* webpackChunkName: "settings-organization" */ 'containers/Settings/Organization'
  ),
);
const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "app-notfound" */ 'containers/NotFound'),
);

const ControlledRoute = ({
  component: Component,
  shouldLoad,
  unloadRedirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (shouldLoad) return <Component {...props} />;
      return <Redirect to={{ pathname: unloadRedirectTo }} />;
    }}
  />
);

const routes = (isAuthenticated) => (
  <Suspense fallback={<div className="loading" />}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route
          path={[
            '/register',
            '/login',
            '/activate/:code',
            '/forgot-password',
            '/reset-password/:token',
          ]}
        >
          <UserLayout>
            <Suspense fallback={<div className="loading" />}>
              <Switch>
                <ControlledRoute
                  path="/register"
                  component={Register}
                  shouldLoad={!isAuthenticated}
                  unloadRedirectTo="/dashboard"
                />
                <ControlledRoute
                  path="/login"
                  component={Login}
                  shouldLoad={!isAuthenticated}
                  unloadRedirectTo="/dashboard"
                />
                <ControlledRoute
                  path="/activate/:code"
                  component={Activate}
                  shouldLoad={!isAuthenticated}
                  unloadRedirectTo="/dashboard"
                />
                <ControlledRoute
                  path="/forgot-password"
                  component={ForgotPassword}
                  shouldLoad={!isAuthenticated}
                  unloadRedirectTo="/dashboard"
                />
                <ControlledRoute
                  path="/reset-password/:token"
                  component={ResetPassword}
                  shouldLoad={!isAuthenticated}
                  unloadRedirectTo="/dashboard"
                />
              </Switch>
            </Suspense>
          </UserLayout>
        </Route>
        <Route
          path={[
            '/dashboard',
            '/users',
            '/organizations',
            '/products',
            '/products/add-product',
            '/orders',
            '/settings',
            '/settings/account',
            '/settings/organization',
          ]}
        >
          <AppLayout>
            <Suspense fallback={<div className="loading" />}>
              <Switch>
                <ControlledRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path="/users"
                  component={UserList}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path="/organizations"
                  component={OrganizationList}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path="/products"
                  component={ProductList}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path="/products/add-product"
                  component={AddProducts}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path="/orders"
                  component={OrderList}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path={['/settings', '/settings/account']}
                  component={Account}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
                <ControlledRoute
                  exact
                  path="/settings/organization"
                  component={Organization}
                  shouldLoad={isAuthenticated}
                  unloadRedirectTo="/login"
                />
              </Switch>
            </Suspense>
          </AppLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Suspense>
);

export default routes;
