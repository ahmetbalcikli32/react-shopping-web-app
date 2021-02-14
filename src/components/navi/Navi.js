import React, {Component} from 'react';
import {Nav, Navbar, NavDropdown, NavItem, NavLink, Row} from "react-bootstrap";
import CartSummary from "../cart/CartSummary";
import {Link} from "react-router-dom";

class Navi extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink>
                                <Link to="/">Home</Link>
                            </NavLink>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                        <NavItem>
                            <Row>
                                <NavLink>
                                    <Link to="/login">Giriş Yap</Link>
                                </NavLink>
                                <NavLink>
                                    <Link to="/signup">Üye Ol</Link>
                                </NavLink>
                            </Row>
                        </NavItem>
                        <NavItem>
                            <CartSummary/>
                        </NavItem>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navi;