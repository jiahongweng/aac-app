import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { BREADCRUMB_ITEMS } from './constants';

const getBreadcrumbTitle = (item) => BREADCRUMB_ITEMS[`breadcrumb.${item}`];

const getUrl = (path, sub, index) => {
  if (index === 0) {
    return '';
  }
  return path.split(sub)[0] + sub;
};

const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1);
  }
  // indicate the dashboard page
  paths.splice(0, 0, 'home');
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => (
          <BreadcrumbItem key={index} active={paths.length === index + 1}>
            {paths.length !== index + 1 ? (
              <NavLink to={`/${getUrl(path, sub, index)}`}>
                {getBreadcrumbTitle(sub)}
              </NavLink>
            ) : (
              getBreadcrumbTitle(sub)
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
};
BreadcrumbItems.propTypes = {
  match: PropTypes.object.isRequired,
};

const BreadcrumbContainer = ({ heading, match }) => (
  <>
    {heading && <h1>{getBreadcrumbTitle(heading)}</h1>}
    <BreadcrumbItems match={match} />
  </>
);
BreadcrumbContainer.propTypes = {
  heading: PropTypes.string,
  match: PropTypes.object.isRequired,
};
BreadcrumbContainer.defaultProps = {
  heading: null,
};

export default BreadcrumbContainer;
