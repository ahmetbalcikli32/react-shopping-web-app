import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Nav, NavDropdown, NavLink} from "react-bootstrap";
import {bindActionCreators} from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import {Link} from "react-router-dom";

class CartSummary extends Component {

    removeFromCart = product => {
        this.props.actions.removeFromCart(product);
        alertify.error(product.title + " sepetten kaldırıldı", 3);
    }

    renderEmptyCart() {
        return (
            <Nav>
                <NavLink>
                    Sepetiniz Boş
                </NavLink>
            </Nav>
        )
    }

    renderCartSummary() {
        return (
            <div>
                <NavDropdown title="Sepetiniz" id="basic-nav-dropdown">
                    {this.props.cart.map(cartItem => (
                        <NavDropdown.Item key={cartItem.product.id}>
                            <Badge variant="danger" onClick={() => this.removeFromCart(cartItem.product)}>X</Badge>
                            {cartItem.product.title}
                            <Badge variant="success">{cartItem.quantity}</Badge></NavDropdown.Item>
                    ))
                    }
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>
                        <Link to="/cart">Sepete Git</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderCartSummary() : this.renderEmptyCart()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);