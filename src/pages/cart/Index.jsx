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
import CartList from "./DataList";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/actions";

import { setCartFilter } from "../../store/cart/slice";
import PaginationDiv from "../../Components/PaginationDiv";
import { getCategory } from "../../store/category/thunk";

const Cart = () => {
  document.title = "Cart | Udemy";

  const dispatch = useDispatch();
  const [filterChanged, setFilterChanged] = useState(false);
  const pagination = useSelector((state) => state.Cart.pagination);
  const category = useSelector((state) => state.Category.data);
  const filter = useSelector((state) => state.Cart.filter);

  useEffect(() => {
    if (category.length === 0) dispatch(getCategory({}));
  }, []);

  const handlePage = (number) => {
    dispatch(getCart({ page: number }));
  };

  const handleSetEditData = (data) => {
    console.log(data);
  };

  const handleFilter = (input) => {
    const { name, value } = input.target;
    dispatch(setCartFilter({ [name]: value }));
    setFilterChanged(true);
  };

  useEffect(() => {
    let delayDebounceFn;
    if (filterChanged) {
      delayDebounceFn = setTimeout(() => {
        dispatch(getCart({ page: 1 }));
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
              <h4 className="mb-sm-0">Cart</h4>
            </div>
          </Col>
        </Row>

        <Card className="mt-3">
          <CardHeader>
            <Row className="align-items-center g-3">
              <Col md={3} className="col-md-3">
                <h5 className="card-title mb-0">All Carts</h5>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="p-0">
            <CartList />
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

export default Cart;
