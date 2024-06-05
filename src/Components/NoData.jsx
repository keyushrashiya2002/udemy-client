import React from "react";
import noDataImg from "../assets/images/nodata.png";

const NoData = () => {
  return (
    <div className="text-center">
      <img src={noDataImg} className="w-100 object-contain mb-3 h-150p" />
      <h3>No record found yet!</h3>
      <p>May be data is empty or try adjusting your filter</p>
    </div>
  );
};

export default NoData;
