import { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavbarBrand,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    //console.log("auth", user);
    const adminLinks = (
      <Fragment>
        <NavItem className="m-1 navbar-text p-2">
          {user ? `Welcome ${user.name}` : ""}
        </NavItem>
        <NavItem className="m-1">
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem className="m-1">
          <NavLink href="/items">Add Item</NavLink>
        </NavItem>
        <NavItem className="m-1">
          <NavLink href="/users">Users</NavLink>
        </NavItem>
        <NavItem className="m-1">
          <Logout />
        </NavItem>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <NavItem className="m-1 navbar-text p-2">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </NavItem>
        <NavItem className="m-1">
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem className="m-1">
          <NavLink href="/cart">Cart</NavLink>
        </NavItem>
        <NavItem className="m-1">
          <NavLink href="/orders">Orders</NavLink>
        </NavItem>
        <NavItem className="m-1">
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem className="m-1">
          <RegisterModal />
        </NavItem>
        <NavItem className="m-1">
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5 ">
          <Container>
            <NavbarBrand
              href="/"
              style={{
                fontFamily: "monospace",
                letterSpacing: "3px",
                fontWeight: "bolder",
                fontSize: "25px",
              }}
            >
              GROCERS
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav
                className="ml-auto d-flex w-100 align-items-center justify-content-end"
                navbar
              >
                {isAuthenticated
                  ? Boolean(user.isAdmin)
                    ? adminLinks
                    : authLinks
                  : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
