import PropTypes from "prop-types";
import React from "react";
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";

const PaginationDiv = ({
  active,
  size,
  step = 1,
  onClickHandler,
  limit,
  totalItems,
  rowClass,
}) => {
  const showingNumbers = step * 2 + 1;
  let startNumber = 2;
  let startArrayNumber = step;
  let needStartDots = false;
  let needEndDots = false;

  if (active > step) {
    startArrayNumber = active - step;
    needStartDots = active > step + startNumber;
  }

  if (size > showingNumbers) {
    needEndDots = size > active + step + 1;
    if (size < active + step + 1) {
      startArrayNumber = size - showingNumbers;
    }
  }

  return (
    <Row
      className={`text-center text-sm-start align-items-center  ${rowClass} mb-4`}
    >
      <Col sm={6}>
        <div>
          <p className="mb-sm-0 text-muted">
            Showing
            <span className="fw-semibold">
              {" "}
              {limit * active - limit + 1}
            </span>{" "}
            to{" "}
            <span className="fw-semibold">
              {Math.min(active * limit - limit + limit, totalItems)}
              &nbsp;
            </span>
            of
            <span className="fw-semibold text-decoration-underline">
              &nbsp;{totalItems}&nbsp;
            </span>
            entries
          </p>
        </div>
      </Col>
      <Col sm={6}>
        <Pagination listClassName="mb-0 justify-content-md-end justify-content-center pagination-separated">
          {active !== 1 && (
            <PaginationItem
              className={`prev  arrow-icon ${active > 1 ? "" : "disabled"}`}
              onClick={() => onClickHandler(Number(active - 1))}
            >
              <PaginationLink to="#">Previous</PaginationLink>
            </PaginationItem>
          )}

          {size > showingNumbers + startNumber && (
            <>
              <PaginationItem
                onClick={(e) =>
                  onClickHandler(Number(e.currentTarget.textContent))
                }
                className={` ${active === 1 ? "active" : ""}`}
              >
                <PaginationLink disabled={active === 1} to="#">
                  1
                </PaginationLink>
              </PaginationItem>

              {needStartDots && (
                <PaginationLink disabled to="#" className="ms-1">
                  ...
                </PaginationLink>
              )}

              {[...Array(showingNumbers)].map((_, i) => {
                const contentNumber = needStartDots
                  ? startArrayNumber
                  : startNumber;
                startNumber++;
                startArrayNumber++;

                return (
                  <PaginationItem
                    key={contentNumber}
                    className={` ${active === contentNumber ? "active" : ""}`}
                    onClick={(e) =>
                      onClickHandler(Number(e.currentTarget.textContent))
                    }
                  >
                    <PaginationLink disabled={active === contentNumber} to="#">
                      {contentNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {needEndDots && (
                <PaginationLink disabled to="#" className="ms-1">
                  ...
                </PaginationLink>
              )}

              <PaginationItem
                className={` ${active === size ? "active" : ""}`}
                onClick={(e) =>
                  onClickHandler(Number(e.currentTarget.textContent))
                }
              >
                <PaginationLink disabled={active === size} to="#">
                  {size}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {active !== size && size > 0 && (
            <PaginationItem
              className={`next  arrow-icon ${active < size ? "" : "disabled"}`}
              onClick={() => onClickHandler(Number(active + 1))}
            >
              <PaginationLink
                to="#"
                className="d-flex align-items-center justify-content-center h-35p"
              >
                Next
                {/* <i className="ri-arrow-drop-right-line lh-0 fs-3"></i> */}
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>
      </Col>
    </Row>
  );
};

PaginationDiv.propTypes = {
  onClickHandler: PropTypes.func,
  active: PropTypes.number,
  size: PropTypes.number,
  step: PropTypes.number,
};

export default PaginationDiv;
