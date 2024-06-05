import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

// Redux sotre
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);
