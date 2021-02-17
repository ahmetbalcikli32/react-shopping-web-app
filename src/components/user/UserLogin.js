import React, {Component} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Input from "../tools/Input";
import "../style/input.css";
import {login} from "../../services/userService";
import ButtonWithProgress from "../tools/ButtonWithProgress";
import ButtonLinkWithoutProgress from "../tools/ButtonLinkWithoutProgress";
import InformationAlert from "../tools/InformationAlert";
import {withApiProgress} from "../../shared/ApiProgress";

class UserLogin extends Component {

    state = {
        username: null,
        password: null,
        message: null,
        error: null,
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
            error: null,
            message: null
        });
    }

    // componentDidMount() {
    //     axios.interceptors.request.use(request => {
    //         this.setState({pendingApiCall: true})
    //         return request;
    //     })
    //
    //     axios.interceptors.response.use(response => {
    //         this.setState({pendingApiCall: false})
    //         return response;
    //     }, error => {
    //         this.setState({pendingApiCall: false})
    //         throw error;
    //     })
    // }

    onClick = async event => {
        event.preventDefault();
        const {username, password} = this.state;
        const body = {
            username, password
        };

        const {push} = this.props.history;

        this.setState({
            error: null
        });

        try {
            await login(body);
            push('/');
            // this.setState({
            //     message: 'Başarıyla giriş yapıldı'
            // });
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    }

    render() {

        const {username, password, message, error} = this.state;
        const buttonEnabled = username && password;
        const {pendingApiCall} = this.props;

        return (
            <Container>
                <div align="center">
                    <Col xs="6">
                        <Card border>
                            <Card.Body>
                                <Form>
                                    <h1 className="text-center">Giriş Yap</h1>
                                    <Input className="label" name="username" label="Kullanıcı Adı" type="text"
                                           placeholder="Kullanıcı Adınızı Giriniz"
                                           handleChange={this.handleChange}/>
                                    <Input className="label" name="password" label="Şifre" type="password"
                                           placeholder="Şifrenizi Giriniz"
                                           handleChange={this.handleChange}/>
                                    {message && <InformationAlert text={message} variant="success"/>}
                                    {error && <InformationAlert text={error} variant="danger"/>}
                                    <ButtonWithProgress variant="success" onClick={this.onClick}
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
}

const UserLoginWithApiProgress = withApiProgress(UserLogin, '/api/auth');

export default UserLoginWithApiProgress;