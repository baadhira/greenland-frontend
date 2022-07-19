import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import  SearchBox  from './SearchBox'
import { logout } from "../actions/userActions";
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand href="/">Greenland</Navbar.Brand>
          </Link>
          <SearchBox/>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
           
            <Nav
              className="mr-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link style={{ textDecoration: "none" }} to="/cart">
                <Nav.Link href="/cart">
                  <i class="fa-solid fa-cart-arrow-down"></i>Cart
                </Nav.Link>
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo?.name} id="username">
                  {console.log("userinfo", userInfo)}

                  <Nav.Link href="/profile">
                    <NavDropdown.Item>
                      <Link style={{ textDecoration: "none" }} to="/profile">
                        Profile{" "}
                      </Link>
                    </NavDropdown.Item>
                  </Nav.Link>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Nav.Link href="/login">
                    <i class="fa-solid fa-user"></i>Login
                  </Nav.Link>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <Nav.Link href="/admin/userlist">
                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/admin/userlist"
                      >
                        Users
                      </Link>
                    </NavDropdown.Item>
                  </Nav.Link>

                  <Nav.Link href="/admin/productlist">
                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/admin/productlist"
                      >
                        Products
                      </Link>
                    </NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link href="/admin/orderlist">
                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/admin/orderlist"
                      >
                        Orders
                      </Link>
                    </NavDropdown.Item>
                  </Nav.Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
