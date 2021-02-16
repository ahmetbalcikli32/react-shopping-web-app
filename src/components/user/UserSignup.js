import React, {Component} from 'react';
import axios from "axios";
import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import Input from "../tools/Input";
import {signup} from "../../services/userService"
import ButtonWithProgress from "../tools/ButtonWithProgress";
import ButtonLinkWithoutProgress from "../tools/ButtonLinkWithoutProgress";
import InformationAlert from "../tools/InformationAlert";
import {withApiProgress} from "../../shared/ApiProgress";

class UserSignup extends Component {

    state = {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
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

        try {
            const response = await signup(body);
            this.setState({
                message: response.data.message
            })
        } catch (error) {
            this.setState({
                errors: error.response.data.validationErrors
            })
        }
    }

    render() {

        const {errors, message} = this.state;
        const {pendingApiCall} = this.props;
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
                                           handleChange={this.handleChange} error={username}/>
                                    <Input className="label" name="firstName" label="Adınız" type="text"
                                           placeholder="Adınızı Giriniz"
                                           handleChange={this.handleChange} error={firstName}/>
                                    <Input className="label" name="lastName" label="Soyadınız" type="text"
                                           placeholder="Soyadınızı Giriniz"
                                           handleChange={this.handleChange} error={lastName}/>
                                    <Input className="label" name="email" label="Email" type="email"
                                           placeholder="Email Adresinizi Giriniz"
                                           handleChange={this.handleChange} error={email}/>
                                    <Input className="label" name="password" label="Şifre" type="password"
                                           placeholder="Şifrenizi Giriniz"
                                           handleChange={this.handleChange} error={password}/>
                                    <ButtonWithProgress onClick={this.onClickSignup} text="Üye Ol"
                                                        variant="dark"
                                                        pendingApiCall={pendingApiCall}
                                                        disabled={pendingApiCall}/>
                                    {message && <InformationAlert text={message} variant="success"/>}
                                    <ButtonLinkWithoutProgress text="Giriş Yap"
                                                               description="Zaten Üye misiniz?"
                                                               className="btn-success btn-block link-button"
                                                               path="/login"/>
                                </Form>
                            </Card.Body>

                        </Card>
                    </Col>
                </div>
            </Container>
        );
    }
}

const UserSignupWithApiProgress = withApiProgress(UserSignup, '/api/users');

export default UserSignupWithApiProgress;