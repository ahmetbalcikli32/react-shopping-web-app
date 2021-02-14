import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Input from "./Input";
import "../style/input.css";
import {Link} from "react-router-dom";
import authService from "../../services/authService";

class UserLogin extends Component {

    state = {
        username: null,
        password: null,
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    onClick = event => {
        event.preventDefault();
        const {username, password} = this.state;
        const body = {
            username, password
        }
        authService.login(body)
    }

    render() {

        return (
            <Container>
                <Col xs="6">
                    <Form>
                        <h1 className="text-center">Giriş Yap</h1>
                        <Input className="label" name="username" label="Kullanıcı Adı" type="text"
                               placeholder="Kullanıcı Adınızı Giriniz"
                               handleChange={this.handleChange}>
                        </Input>
                        <Input className="label" name="password" label="Şifre" type="password"
                               placeholder="Şifrenizi Giriniz"
                               handleChange={this.handleChange}>
                        </Input>
                        <Form.Group>
                            <Button variant="success" onClick={this.onClick} block>Giriş Yap</Button>
                        </Form.Group>
                        <Form.Group>
                                <Row className="alignment">
                                    <Col xs="6">
                                        <h5>Henüz Üye Değil misiniz?</h5>
                                    </Col>
                                    <Col xs="6">
                                        <Link to="/signup" className="btn-dark btn-block link-button">Üye Ol</Link>
                                    </Col>
                                </Row>
                        </Form.Group>
                    </Form>
                </Col>
            </Container>
        );
    }
}

export default UserLogin;