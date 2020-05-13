import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const ListPagination = ({
  totalPage,
  currentPage,
  numberLimit,
  lastIsActive,
  firstIsActive,
  onChangePage,
}) => {
  let startPoint = 1;
  let endPoint = numberLimit;

  if (numberLimit > totalPage) {
    startPoint = 1;
    endPoint = totalPage;
  } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
    startPoint = 1;
    endPoint = numberLimit;
  } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
    startPoint = currentPage - parseInt(numberLimit / 2, 10);
    endPoint = currentPage + parseInt(numberLimit / 2, 10);
  } else {
    startPoint = totalPage - parseInt(numberLimit - 1, 10);
    endPoint = totalPage;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (let i = startPoint; i <= endPoint; i++) {
    points.push(i);
  }

  const firstPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const lastPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';
  const prevPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const nextPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';

  return totalPage > 1 ? (
    <Colxx xxs="12" className="mt-3 mb-3">
      <Nav className="pagination justify-content-center">
        {firstIsActive && (
          <NavItem className={`page-item ${firstPageButtonClassName}`}>
            <NavLink
              href="#"
              location={{}}
              className="page-link first"
              onClick={() => onChangePage(1)}
            >
              <i className="simple-icon-control-start" />
            </NavLink>
          </NavItem>
        )}

        <NavItem className={`page-item ${prevPageButtonClassName}`}>
          <NavLink
            href="#"
            className="page-link prev"
            onClick={() => onChangePage(currentPage - 1)}
          >
            <i className="simple-icon-arrow-left" />
          </NavLink>
        </NavItem>
        {points.map((i) => (
          <NavItem
            key={i}
            className={`page-item ${currentPage === i && 'active'}`}
          >
            <NavLink
              href="#"
              className="page-link"
              onClick={() => onChangePage(i)}
            >
              {i}
            </NavLink>
          </NavItem>
        ))}
        <NavItem className={`page-item ${nextPageButtonClassName}`}>
          <NavLink
            href="#"
            className="page-link next"
            onClick={() => onChangePage(currentPage + 1)}
          >
            <i className="simple-icon-arrow-right" />
          </NavLink>
        </NavItem>
        {lastIsActive && (
          <NavItem className={`page-item ${lastPageButtonClassName}`}>
            <NavLink
              href="#"
              className="page-link last"
              onClick={() => onChangePage(totalPage)}
            >
              <i className="simple-icon-control-end" />
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Colxx>
  ) : (
    <Colxx xxs="12" className="mt-2" />
  );
};

ListPagination.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  numberLimit: PropTypes.number,
  lastIsActive: PropTypes.bool,
  firstIsActive: PropTypes.bool,
  onChangePage: PropTypes.func,
};

ListPagination.defaultProps = {
  totalPage: 0,
  currentPage: 1,
  numberLimit: 5,
  lastIsActive: true,
  firstIsActive: true,
  onChangePage: () => {},
};

export default ListPagination;
