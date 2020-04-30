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
  import(/* webpackChunkName: "user-login" */ 'containers/Login'),
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-rgister" */ 'containers/Register'),
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "app-dashboard" */ 'containers/Dashboard'),
);
const UserList = React.lazy(() =>
  import(/* webpackChunkName: "app-userlist" */ 'containers/UserList'),
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
  layout: Layout,
  shouldLoad,
  unloadRedirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (shouldLoad)
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      return <Redirect to={{ pathname: unloadRedirectTo }} />;
    }}
  />
);

const routes = (isAuthenticated) => (
  <Suspense fallback={<div className="loading" />}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <ControlledRoute
          path="/register"
          component={Register}
          layout={UserLayout}
          shouldLoad={!isAuthenticated}
          unloadRedirectTo="/dashboard"
        />
        <ControlledRoute
          path="/login"
          component={Login}
          layout={UserLayout}
          shouldLoad={!isAuthenticated}
          unloadRedirectTo="/dashboard"
        />
        <ControlledRoute
          exact
          path="/dashboard"
          component={Dashboard}
          layout={AppLayout}
          shouldLoad={isAuthenticated}
          unloadRedirectTo="/login"
        />
        <ControlledRoute
          exact
          path="/users"
          component={UserList}
          layout={AppLayout}
          shouldLoad={isAuthenticated}
          unloadRedirectTo="/login"
        />
        <ControlledRoute
          exact
          path={['/settings', '/settings/account']}
          component={Account}
          layout={AppLayout}
          shouldLoad={isAuthenticated}
          unloadRedirectTo="/login"
        />
        <ControlledRoute
          exact
          path="/settings/organization"
          component={Organization}
          layout={AppLayout}
          shouldLoad={isAuthenticated}
          unloadRedirectTo="/login"
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Suspense>
);

export default routes;
