import React from "react";
import {Form} from "react-bootstrap";

const Input = (props) => {
    const {className, label, error, name, handleChange, placeholder, type} = props;

    return (
        <Form.Group>
            <div align="left">
                <Form.Label className={props.className}>{props.label}</Form.Label>
                <Form.Control
                    required type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.handleChange}
                    isInvalid={props.error}
                />
                <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
            </div>
        </Form.Group>
    );
}

export default Input;