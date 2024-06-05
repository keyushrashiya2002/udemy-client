import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Table } from "reactstrap";
import { getCart, postPurchase } from "../../store/actions";
import NoData from "../../Components/NoData";
import { deleteCart, postCart, updateCart } from "../../store/cart/thunk";

const CartList = () => {
  const dispatch = useDispatch();

  // Retrieve data from Redux store
  const { data, loading } = useSelector((state) => ({
    data: state.Cart.data,
    loading: state.Cart.loading,
  }));

  // Fetch categories on component mount
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getCart({}));
    }
  }, [data.length, dispatch]);

  // Render placeholder rows when loading
  const renderPlaceholderRows = () => {
    return Array((data.length > 0 ? data.length : 10) || 10)
      .fill(1)
      .map((_, key) => (
        <tr key={key}>
          <td colSpan={3} className="placeholder-glow p-0  overflow-hidden">
            <span className="placeholder d-flex py-4 w-100"></span>
          </td>
        </tr>
      ));
  };

  // Render table content
  const renderContent = () => {
    return data.map((item, key) => (
      <tr key={key}>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              onClick={() => {
                dispatch(updateCart({ type: "decrease", id: item._id }));
              }}
              disabled={item.quantity === 0}
            >
              -
            </Button>
            <input
              value={item.quantity}
              readOnly
              type="number"
              className="form-control w-25"
            />
            <Button
              onClick={() => {
                dispatch(updateCart({ type: "increase", id: item._id }));
              }}
            >
              +
            </Button>
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              color="danger"
              onClick={() => {
                dispatch(deleteCart(item._id));
              }}
            >
              x
            </Button>
          </div>
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

  const totalAmount = data
    .map((item) => item.price * item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  const totalQuantity = data
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <div className="table-responsive">
        <Table className="align-middle table-nowrap mb-0" hover>
          {data.length !== 0 && (
            <thead>
              <tr>
                <th scope="col" className="table-light">
                  Title
                </th>
                <th scope="col" className="table-light">
                  Price
                </th>
                <th scope="col" className="table-light text-center">
                  Quantity
                </th>
                <th scope="col" className="table-light text-center"></th>
              </tr>
            </thead>
          )}

          <tbody>
            {loading
              ? renderPlaceholderRows()
              : data.length !== 0
              ? renderContent()
              : renderNoData()}
            <tr>
              <td className="text-end pe-3">Total</td>
              <td className=" pe-3">{totalAmount}</td>
              <td className=" pe-3 text-center">{totalQuantity}</td>
              <td className=" pe-3 text-center">
                <Button
                  onClick={() => {
                    dispatch(
                      postPurchase({
                        items: data.map((item) => ({
                          product: item.productId,
                          price: item.price,
                          quantity: item.quantity,
                        })),
                        totalAmount,
                      })
                    );
                  }}
                >
                  Place order
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CartList;
