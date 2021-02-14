import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import {Badge, Button, Table} from "react-bootstrap";
import alertify from "alertifyjs";

class ProductList extends Component {

    componentDidMount() {
        this.props.actions.getProducts()
    }

    addToCart = product => {
        this.props.actions.addToCart({quantity: 1, product})
        alertify.success(product.title + " sepete eklendi", 3);
    }

    render() {
        return (
            <div>
                <h3 align="left">
                    <Badge variant="warning">Products</Badge>
                    <Badge variant="success">{this.props.currentCategory.name}</Badge>
                </h3>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th>Stock Amount</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.products.map(product => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stockAmount}</td>
                                <td><Button variant="primary" onClick={() => this.addToCart(product)}>Ekle</Button></td>
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
        products: state.productListReducer,
        currentCategory: state.changeCategoryReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getProducts: bindActionCreators(productActions.getProducts, dispatch),
            addToCart: bindActionCreators(cartActions.addToCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);