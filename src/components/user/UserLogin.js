import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Form} from "react-bootstrap";
import Input from "../tools/Input";
import "../style/input.css";
import {login} from "../../services/userService";
import ButtonWithProgress from "../tools/ButtonWithProgress";
import ButtonLinkWithoutProgress from "../tools/ButtonLinkWithoutProgress";
import InformationAlert from "../tools/InformationAlert";
import {withApiProgress} from "../../shared/ApiProgress";
import {connect} from "react-redux";
import * as userActions from "../../redux/actions/authActions";
import {bindActionCreators} from "redux";

const UserLogin = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setError(undefined)
    }, [username, password])

    const onClickLogin = async event => {
        event.preventDefault();
        const body = {
            username, password
        };

        const {push} = props.history;

        try {
            const response = await login(body);
            push('/');
            const authState = {
                ...response.data,
                password
            };
            props.actions.loginUser(authState);
        } catch (apiError) {
            setError(apiError.response.data.message)
        }
    }

    const buttonEnabled = username && password;
    const {pendingApiCall} = props;

    return (
        <Container>
            <div align="center" style={{marginTop: "50px"}}>
                <Col xs="6">
                    <Card border>
                        <Card.Body>
                            <Form>
                                <h1 className="text-center">Giriş Yap</h1>
                                <Input className="label" label="Kullanıcı Adı" type="text"
                                       placeholder="Kullanıcı Adınızı Giriniz"
                                       handleChange={event => setUsername(event.target.value)}/>
                                <Input className="label" label="Şifre" type="password"
                                       placeholder="Şifrenizi Giriniz"
                                       handleChange={event => setPassword(event.target.value)}/>
                                {error && <InformationAlert text={error} variant="danger"/>}
                                <ButtonWithProgress variant="success" onClick={onClickLogin}
                                                    text="Giriş Yap"
                                                    pendingApiCall={pendingApiCall}
                                                    disabled={!buttonEnabled || pendingApiCall}/>
                                <ButtonLinkWithoutProgress text="Üye Ol"
                                                           description="Henüz Üye Değil misiniz?"
                                                           path="/signup"
                                                           className="btn-dark btn-block link-button"/>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </Container>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loginUser: bindActionCreators(userActions.loginSuccess, dispatch)
        }
    }
}

const UserLoginWithApiProgress = withApiProgress(UserLogin, '/api/auth');

export default (connect)(null, mapDispatchToProps)(UserLoginWithApiProgress);
