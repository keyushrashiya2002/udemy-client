import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

const Header = () => {
  return (
    <React.Fragment>
      <header id="page-topbar">
        <Container>
          <Nav>
            <NavItem>
              <Link className="nav-link" to={"/product"}>
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={"/cart"}>
                Cart
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link text-danger" to={"/login"}>
                Logout
              </Link>
            </NavItem>
          </Nav>
        </Container>
      </header>
    </React.Fragment>
  );
};

export default Header;
