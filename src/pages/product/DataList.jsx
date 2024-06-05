import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "reactstrap";
import { getProduct } from "../../store/actions";
import NoData from "../../Components/NoData";

const ProductList = () => {
  const dispatch = useDispatch();

  // Retrieve data from Redux store
  const { data, loading, limit } = useSelector((state) => ({
    data: state.Product.data,
    loading: state.Product.loading,
    limit: state.Product.pagination.limit,
  }));

  // Fetch categories on component mount
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getProduct({}));
    }
  }, [data.length, dispatch]);

  // Render placeholder rows when loading
  const renderPlaceholderRows = () => {
    return Array((data.length > 0 ? data.length : limit) || 10)
      .fill(1)
      .map((item, key) => (
        <tr key={key}>
          <td colSpan={9} className="placeholder-glow p-0  overflow-hidden">
            <span className="placeholder d-flex h-57p w-100"></span>
          </td>
        </tr>
      ));
  };

  // Render table content
  const renderContent = () => {
    return data.map((item, key) => (
      <tr key={key}>
        <td className="text-center"></td>
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
                <th scope="col" className="table-light text-center">
                  #
                </th>
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

export default ProductList;
