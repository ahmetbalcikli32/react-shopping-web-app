import React, {Component} from 'react';
import {Badge, ListGroup} from "react-bootstrap";
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

    render() {
        return (
            <div>
                <h3 align="left">
                    <Badge variant="warning">Categories</Badge>
                </h3>
                <ListGroup>
                    {this.props.categories.map(category => (
                        <ListGroup.Item active={category.id === this.props.currentCategory.id}
                                        key={category.id}
                                        onClick={() => this.selectCategory(category)}>{category.name}</ListGroup.Item>
                    ))}
                </ListGroup>
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