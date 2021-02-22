import React, {Component} from 'react';
import {Badge, ListGroup, Tab} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as categoryAction from "../../redux/actions/categoryActions";
import * as productAction from "../../redux/actions/productActions";

class CategoryList extends Component {

    componentDidMount() {
        this.props.actions.getCategories();
    }

    selectCategory = (category) => {
        this.props.actions.changeCategory(category);
        this.props.actions.getProducts(category.id);
    }

    showAllCategories = () => {
        this.props.actions.getProducts();
    }

    render() {
        return (
            <div>
                <h3 align="left">
                    <Badge variant="warning">Categories</Badge>
                </h3>
                <Tab.Container>
                    <ListGroup>
                        <ListGroup.Item action href="#allCategories" onClick={() => this.showAllCategories()}>Tüm Ürünler</ListGroup.Item>
                        {this.props.categories.map(category => (
                            <ListGroup.Item active={category.id === this.props.currentCategory.id}
                                            key={category.id} action
                                            onClick={() => this.selectCategory(category)}>{category.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Tab.Container>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        categories: state.categoryListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            changeCategory: bindActionCreators(categoryAction.changeCategory, dispatch),
            getCategories: bindActionCreators(categoryAction.getCategories, dispatch),
            getProducts: bindActionCreators(productAction.getProducts, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);