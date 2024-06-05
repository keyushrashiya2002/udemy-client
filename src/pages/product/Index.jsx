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
import ProductList from "./DataList";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/actions";

import {
  resetProductFilter,
  setProductFilter,
} from "../../store/product/slice";
import PaginationDiv from "../../Components/PaginationDiv";
import { getCategory } from "../../store/category/thunk";

const Product = () => {
  document.title = "Product | Udemy";

  const dispatch = useDispatch();
  const [filterChanged, setFilterChanged] = useState(false);
  const pagination = useSelector((state) => state.Product.pagination);
  const category = useSelector((state) => state.Category.data);
  const filter = useSelector((state) => state.Product.filter);

  useEffect(() => {
    if (category.length === 0) dispatch(getCategory({}));
  }, []);

  const handlePage = (number) => {
    dispatch(getProduct({ page: number }));
  };

  const handleSetEditData = (data) => {
    console.log(data);
  };

  const handleFilter = (input) => {
    const { name, value } = input.target;
    dispatch(setProductFilter({ [name]: value }));
    setFilterChanged(true);
  };

  useEffect(() => {
    let delayDebounceFn;
    if (filterChanged) {
      delayDebounceFn = setTimeout(() => {
        dispatch(getProduct({ page: 1 }));
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
              <h4 className="mb-sm-0">Product</h4>
            </div>
          </Col>
        </Row>

        <Card className="mt-3">
          <CardHeader>
            <Row className="align-items-center g-3">
              <Col md={3} className="col-md-3">
                <h5 className="card-title mb-0">All Products</h5>
              </Col>
              <Col className="col-md-auto ms-auto">
                <div className="d-flex gap-2">
                  <select
                    className="form-control mb-0"
                    name="category"
                    value={filter.category}
                    onChange={handleFilter}
                  >
                    <option disabled>Select category</option>
                    <option value="">All category</option>
                    {category.map((item, key) => {
                      return (
                        <option
                          key={key}
                          value={item._id}
                          className="text-capitalize"
                        >
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="number"
                    className="form-control search"
                    placeholder="Min price"
                    name="minPrice"
                    value={filter.minPrice}
                    onChange={handleFilter}
                  />
                  <input
                    type="number"
                    className="form-control search"
                    placeholder="Max price"
                    name="maxPrice"
                    value={filter.maxPrice}
                    onChange={handleFilter}
                  />
                  <Button
                    onClick={() => {
                      dispatch(resetProductFilter());
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="p-0">
            <ProductList />
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

export default Product;
