import React from 'react';
import {Alert, Form} from "react-bootstrap";

const InformationAlert = (props) => {

    const {text, variant} = props;

    return (
        <Form.Group>
            <Alert variant={variant}>{text}</Alert>
        </Form.Group>
    );
};

export default InformationAlert;