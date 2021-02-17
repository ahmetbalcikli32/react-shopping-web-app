import React, {Component} from 'react';
import CategoryList from "../category/CategoryList";
import ProductList from "../product/ProductList";
import {Col, Row} from "react-bootstrap";
import Navi from "../navi/Navi";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xl="3">
                        <CategoryList/>
                    </Col>
                    <Col xs="9">
                        <ProductList/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;