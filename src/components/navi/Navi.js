import React, {Component} from 'react';
import {Image, Nav, Navbar, NavDropdown, NavItem, NavLink, Row} from "react-bootstrap";
import CartSummary from "../cart/CartSummary";
import {Link} from "react-router-dom";
import logo from "../../assets/eticaret-logo.PNG";
import "../../App.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../../redux/actions/userActions";

class Navi extends Component {

    onClickLogout = () => {
        this.props.actions.logoutUser()
    };

    render() {

        // const {username, isLoggedIn} = this.props.loggedInState;
        const isLoggedIn = true;
        const username = "user1";

        let links = (
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
        );
        if (isLoggedIn) {
            links = (
                <NavItem>
                    <Row>
                        <Nav.Item>
                            <Link className="nav-link" to={`/user/${username}`}>{username}</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <CartSummary/>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" onClick={this.onClickLogout}>Logout</Link>
                        </Nav.Item>
                    </Row>
                </NavItem>
            )
        }

        return (
            <div>
                <Navbar bg="light" expand="sm" className="App-header">
                    <Link to="/">
                        <Navbar.Brand><Image src={logo} alt="Eticaret Logo"
                                             className="App-logo"/></Navbar.Brand>
                    </Link>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        {links}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedInState: state.userReducer
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            logoutUser: bindActionCreators(userActions.logoutSuccess, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);