import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Breadcrumb } from 'components/navs';

const Dashboard = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="dashboard" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p></p>
      </Colxx>
    </Row>
  </>
);

Dashboard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Dashboard;
