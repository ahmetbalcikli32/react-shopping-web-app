import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Button, Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

class CartDetail extends Component {

    removeFromCart = product => {
        this.props.actions.removeFromCart(product)
        alertify.error(product.title + " sepetten kaldırıldı");
    }

    render() {
        return (
            <div>
                <h3 align="left">Sepet Detayı</h3>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ürün Kodu</th>
                        <th>Ürün Adı</th>
                        <th>Adet</th>
                        <th>Birim Fiyatı</th>
                        <th>Tutar</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.cart.map(cartItem => (
                            <tr key={cartItem.product.id}>
                                <th scope="row">{cartItem.product.id}</th>
                                <td>{cartItem.product.serialCode}</td>
                                <td>{cartItem.product.title}</td>
                                <td>{cartItem.quantity}</td>
                                <td>{cartItem.product.price}</td>
                                <td>{cartItem.product.price * cartItem.quantity}</td>
                                <td><Button variant="danger"
                                            onClick={() => this.removeFromCart(cartItem.product)}>Kaldır</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);