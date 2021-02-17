import React from 'react';
import {Button, Form, Spinner} from "react-bootstrap";

const ButtonWithProgress = (props) => {

    const {pendingApiCall, variant, onClick, disabled, text} = props

    return (
        <Form.Group>
            <Button variant={variant} type="submit" block
                    onClick={onClick}
                    disabled={disabled}>{pendingApiCall &&
            <Spinner as="span" size="sm" animation={"border"}/>}{text}</Button>
        </Form.Group>
    );
};

export default ButtonWithProgress;