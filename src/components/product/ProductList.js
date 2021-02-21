import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import {Badge, Button, Card, Table, Form, Container, Row} from "react-bootstrap";
import alertify from "alertifyjs";
import "../style/input.css";
import CurrencyFormat from 'react-currency-format';
import {saveCart} from "../../services/cartService";

class ProductList extends Component {

    componentDidMount() {
        this.props.actions.getProducts()
    }

    addToCart = product => {
        this.props.actions.addToCart({quantity: 1, product})
        alertify.success(product.title + " sepete eklendi", 3);
    }

    saveCart = async event => {
        event.preventDefault();
        const {cart} = this.props;
        console.log(cart);
        try {
            const response = await saveCart(cart);
            console.log(response)
        } catch (apiError) {
            const error = apiError.response.data.message;
            console.log(error)
        }
    }

    /*
    renderWithTable() {
        return (
            <div>
                <h3 align="left">
                    <Badge variant="warning">Products</Badge>
                    <Badge variant="success">{this.props.currentCategory.name}</Badge>
                </h3>
                <Table striped bordered hover className="alignment">
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
                            <tr className="align-me" key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td className="align-me">{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stockAmount}</td>
                                <td><Button variant="info" onClick={() => this.addToCart(product)}>Sepete Ekle</Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
     */

    render() {

        let CurrencyFormat = require('react-currency-format');

        return (
            <div>
                <Row>
                    {this.props.products.map(product => (
                        <Card key={product.id}>
                            <Card.Img className="img" variant="top" src={product.photoUrl}/>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{product.serialCode}</Card.Subtitle>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Title>{product.categoryId}</Card.Title>
                                {/*<Card.Text>{product.description}</Card.Text>*/}
                                <Card.Footer className="card-price"><CurrencyFormat value={product.price}
                                                                                    displayType={'text'}
                                                                                    decimalSeparator={null}
                                                                                    thousandSeparator={'.'}
                                                                                    suffix={'TL'} renderText={value => <div>{value}</div>}/></Card.Footer>
                                <Form.Group>
                                    <Row>
                                        <div>
                                            <Button variant="info" onClick={() => this.addToCart(product)}>Sepete Ekle</Button>
                                        </div>
                                        <div>
                                            <Button variant="info" onClick={this.saveCart}>SaveCart</Button>
                                        </div>
                                    </Row>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productListReducer,
        currentCategory: state.changeCategoryReducer,
        cart: state.cartReducer
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