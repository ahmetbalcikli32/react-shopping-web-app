import React, {useState} from 'react';
import {Card, Col, Container, Form} from "react-bootstrap";
import Input from "../tools/Input";
import {signup} from "../../services/userService"
import ButtonWithProgress from "../tools/ButtonWithProgress";
import ButtonLinkWithoutProgress from "../tools/ButtonLinkWithoutProgress";
import InformationAlert from "../tools/InformationAlert";
import {withApiProgress} from "../../shared/ApiProgress";

const UserSignup = props => {

    const [form, setForm] = useState({
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        errors: {},
        successful: false,
    });

    const [message, setMessage] = useState();
    const [errors, setErrors] = useState({});

    const handleChange = event => {
        const {name, value} = event.target;
        const errorsCopy = {...errors};
        errorsCopy[name] = undefined;
        setErrors(errorsCopy);
        const formCopy = {...form};
        setForm((previousForm) => ({...previousForm, [name]: value}));
    }

    const onClickSignup = async event => {
        event.preventDefault();
        const {username, firstName, lastName, password, email} = form;

        const body = {
            username, firstName, lastName, password, email
        }

        try {
            const response = await signup(body);
            setMessage(response.data.message);
        } catch (error) {
            setErrors(error.response.data.validationErrors)
        }
    }

    const {pendingApiCall} = props;
    const {username: usernameError, firstName: firstNameError, lastName: lastNameError, password: passwordError, email: emailError} = errors;

    return (
        <Container>
            <div align="center" style={{marginTop: "50px"}}>
                <Col xs="md-6">
                    <Card border>
                        <Card.Body>
                            <Form>
                                <h1 className="text-center">Üye Ol</h1>
                                <Input className="label" name="username" label="Kullanıcı Adı" type="text"
                                       placeholder="Kullanıcı Adınızı Giriniz"
                                       handleChange={handleChange} error={usernameError}/>
                                <Input className="label" name="firstName" label="Adınız" type="text"
                                       placeholder="Adınızı Giriniz"
                                       handleChange={handleChange} error={firstNameError}/>
                                <Input className="label" name="lastName" label="Soyadınız" type="text"
                                       placeholder="Soyadınızı Giriniz"
                                       handleChange={handleChange} error={lastNameError}/>
                                <Input className="label" name="email" label="Email" type="email"
                                       placeholder="Email Adresinizi Giriniz"
                                       handleChange={handleChange} error={emailError}/>
                                <Input className="label" name="password" label="Şifre" type="password"
                                       placeholder="Şifrenizi Giriniz"
                                       handleChange={handleChange} error={passwordError}/>
                                <ButtonWithProgress onClick={onClickSignup} text="Üye Ol"
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

const UserSignupWithApiProgress = withApiProgress(UserSignup, '/api/users');

export default UserSignupWithApiProgress;