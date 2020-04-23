import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const Footer = () => (
  <footer className="page-footer">
    <div className="footer-content">
      <div className="container-fluid">
        <Row>
          <Colxx xxs="12" sm="6">
            <p className="mb-0 text-muted">
              © Copyright 2019 Alpha Apparel Co.
            </p>
          </Colxx>
          <Colxx className="col-sm-6 d-none d-sm-block">
            <ul className="breadcrumb pt-0 pr-0 float-right">
              <li className="breadcrumb-item mb-0">
                <NavLink className="btn-link" to="#" location={{}}>
                  About
                </NavLink>
              </li>
              <li className="breadcrumb-item mb-0">
                <NavLink className="btn-link" to="#" location={{}}>
                  Policy
                </NavLink>
              </li>
              <li className="breadcrumb-item mb-0">
                <NavLink className="btn-link" to="#" location={{}}>
                  Faq
                </NavLink>
              </li>
            </ul>
          </Colxx>
        </Row>
      </div>
    </div>
  </footer>
);

export default Footer;
