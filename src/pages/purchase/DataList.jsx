import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Table } from "reactstrap";
import { getPurchase } from "../../store/actions";
import NoData from "../../Components/NoData";
import { postCart } from "../../store/cart/thunk";

const PurchaseList = () => {
  const dispatch = useDispatch();

  // Retrieve data from Redux store
  const { data, loading, limit } = useSelector((state) => ({
    data: state.Purchase.data,
    loading: state.Purchase.loading,
    limit: state.Purchase.pagination.limit,
  }));

  // Fetch categories on component mount
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getPurchase({}));
    }
  }, [data.length, dispatch]);

  // Render placeholder rows when loading
  const renderPlaceholderRows = () => {
    return Array((data.length > 0 ? data.length : limit) || 10)
      .fill(1)
      .map((_, key) => (
        <tr key={key}>
          <td colSpan={4} className="placeholder-glow p-0  overflow-hidden">
            <span className="placeholder d-flex py-4 w-100"></span>
          </td>
        </tr>
      ));
  };

  // Render table content
  const renderContent = () => {
    return data.map((item, key) => (
      <tr key={key}>
        <td>{item.createdAt}</td>
        <td>{item.totalAmount}</td>

        <td>
          <Button
            onClick={() => {
              dispatch(postCart(item._id));
            }}
            color="primary"
          >
            View
          </Button>
        </td>
      </tr>
    ));
  };

  // Render No data
  const renderNoData = () => {
    return (
      <tr>
        <td colSpan={9} className="p-0 rounded rounded-3">
          <span className="py-5 w-100 d-flex align-items-center justify-content-center">
            <NoData />
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="table-responsive">
        <Table className="align-middle table-nowrap mb-0" hover>
          {data.length !== 0 && (
            <thead>
              <tr>
                <th scope="col" className="table-light">
                  Time
                </th>
                <th scope="col" className="table-light">
                  Price
                </th>

                <th scope="col" className="table-light"></th>
              </tr>
            </thead>
          )}

          <tbody>
            {loading
              ? renderPlaceholderRows()
              : data.length !== 0
              ? renderContent()
              : renderNoData()}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PurchaseList;
