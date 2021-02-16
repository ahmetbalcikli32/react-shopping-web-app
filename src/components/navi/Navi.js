import React, {Component} from 'react';
import {Image, Nav, Navbar, NavDropdown, NavItem, NavLink, Row} from "react-bootstrap";
import CartSummary from "../cart/CartSummary";
import {Link} from "react-router-dom";
import logo from "../../assets/eticaret-logo.PNG";
import "../../App.css";

class Navi extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="sm" className="App-header">
                    <Link to="/">
                        <Navbar.Brand><Image src={logo} alt="Eticaret Logo" className="App-logo"/></Navbar.Brand>
                    </Link>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <NavItem>
                            <Row>
                                <Nav.Item>
                                    <Link className="nav-link" to="/login">Giriş Yap</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="nav-link" to="/signup">Üye Ol</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <CartSummary/>
                                </Nav.Item>
                            </Row>
                        </NavItem>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navi;