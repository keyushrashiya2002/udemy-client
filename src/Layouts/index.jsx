import React from "react";

//import Components
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
