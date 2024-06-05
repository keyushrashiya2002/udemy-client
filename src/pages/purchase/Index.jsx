import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import PurchaseList from "./DataList";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../../store/actions";

import {
  resetPurchaseFilter,
  setPurchaseFilter,
} from "../../store/purchase/slice";
import PaginationDiv from "../../Components/PaginationDiv";
import { getCategory } from "../../store/category/thunk";

const Purchase = () => {
  document.title = "Purchase | Udemy";

  const dispatch = useDispatch();
  const [filterChanged, setFilterChanged] = useState(false);
  const pagination = useSelector((state) => state.Purchase.pagination);
  const category = useSelector((state) => state.Category.data);
  const filter = useSelector((state) => state.Purchase.filter);

  useEffect(() => {
    if (category.length === 0) dispatch(getCategory({}));
  }, []);

  const handlePage = (number) => {
    dispatch(getPurchase({ page: number }));
  };

  const handleSetEditData = (data) => {
    console.log(data);
  };

  const handleFilter = (input) => {
    const { name, value } = input.target;
    dispatch(setPurchaseFilter({ [name]: value }));
    setFilterChanged(true);
  };

  useEffect(() => {
    let delayDebounceFn;
    if (filterChanged) {
      delayDebounceFn = setTimeout(() => {
        dispatch(getPurchase({ page: 1 }));
      }, 500);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [filter, filterChanged]);

  return (
    <div className="page-content">
      <Container>
        <Row>
          <Col>
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Purchase</h4>
            </div>
          </Col>
        </Row>

        <Card className="mt-3">
          <CardHeader>
            <Row className="align-items-center g-3">
              <Col md={3} className="col-md-3">
                <h5 className="card-title mb-0">All Purchases</h5>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="p-0">
            <PurchaseList />
            <PaginationDiv
              active={pagination.page}
              size={pagination.totalPages}
              totalItems={pagination.totalItems}
              limit={pagination.limit}
              rowClass={"mt-3 px-3"}
              onClickHandler={(number) => handlePage(number)}
            />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Purchase;
