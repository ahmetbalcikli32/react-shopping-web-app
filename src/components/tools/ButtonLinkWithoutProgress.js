import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const ButtonLinkWithoutProgress = (props) => {

    const { description, text, className, path} = props;

    return (
            <Form.Group>
                <Row className="alignment">
                    <Col xs="6">
                        <h5>{description}</h5>
                    </Col>
                    <Col xs="6">
                        <Link to={path} className={className}>{text}</Link>
                    </Col>
                </Row>
            </Form.Group>
    );
};

export default ButtonLinkWithoutProgress;