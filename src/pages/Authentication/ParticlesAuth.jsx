import React from "react";
import withRouter from "../../Components/withRouter";

const ParticlesAuth = ({ children }) => {
  return (
    <React.Fragment>
      <div className="auth-page-wrapper pt-5">
        {/* pass the children */}
        {children}
      </div>
    </React.Fragment>
  );
};

export default withRouter(ParticlesAuth);
