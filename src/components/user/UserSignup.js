import React, {Component} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import Input from "./Input";
import {Link} from "react-router-dom";

class UserSignup extends Component {

    state = {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        pendingApiCall: false,
        errors: {},
        successful: false,
        message: null
    };

    handleChange = event => {
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;
        this.setState({[name]: value, errors});
    }

    onClickSignup = async event => {
        event.preventDefault();

        const {username, firstName, lastName, password, email} = this.state;

        const body = {
            username, firstName, lastName, password, email
        }
        this.setState({pendingApiCall: true});

        axios.post('/api/users', body)
            .then(response => {
                this.setState({
                        message: response.data.message,
                        successful: true
                    });
            })
            .catch(error => {
                this.setState({errors: error.response.data.validationErrors})
            });
        this.setState({pendingApiCall: false})
    }

    render() {

        const {pendingApiCall, errors} = this.state;
        const {username, firstName, lastName, password, email} = errors;

        return (
            <Container>
                <div align="center">
                    <Col xs="md-6">
                        <Card border>
                            <Card.Body>
                                <Form>
                                    <h1 className="text-center">Üye Ol</h1>
                                    <Input className="label" name="username" label="Kullanıcı Adı" type="text"
                                           placeholder="Kullanıcı Adınızı Giriniz"
                                           handleChange={this.handleChange} error={username}>
                                    </Input>
                                    <Input className="label" name="firstName" label="Adınız" type="text"
                                           placeholder="Adınızı Giriniz"
                                           handleChange={this.handleChange} error={firstName}>
                                    </Input>
                                    <Input className="label" name="lastName" label="Soyadınız" type="text"
                                           placeholder="Soyadınızı Giriniz"
                                           handleChange={this.handleChange} error={lastName}>
                                    </Input>
                                    <Input className="label" name="email" label="Email" type="email"
                                           placeholder="Email Adresinizi Giriniz"
                                           handleChange={this.handleChange} error={email}>
                                    </Input>
                                    <Input className="label" name="password" label="Şifre" type="password"
                                           placeholder="Şifrenizi Giriniz"
                                           handleChange={this.handleChange} error={password}>
                                    </Input>
                                    <Form.Group>
                                        <Button className="btn-dark btn-block padded-button" type="submit"
                                                onClick={this.onClickSignup}
                                                disabled={pendingApiCall}>{pendingApiCall &&
                                        <Spinner as="span" size="sm" animation={"border"}/>}Üye Ol</Button>
                                    </Form.Group>
                                    <Form.Group>
                                        {this.state.message && (
                                            <div className="form-group">
                                                <div
                                                    className={
                                                        this.state.successful && "alert alert-success"}>
                                                    {this.state.message}
                                                </div>
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Row className="alignment">
                                            <Col xs="6">
                                                <h5>Zaten Üye misiniz?</h5>
                                            </Col>
                                            <Col xs="6">
                                                <Link to="/login" className="btn-success btn-block link-button">Giriş
                                                    Yap</Link>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Card.Body>

                        </Card>
                    </Col>
                </div>
            </Container>
        );
    }
}

export default UserSignup;