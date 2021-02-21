import '../../App.css';
import {Container, Row} from "react-bootstrap";
import Dashboard from "./Dashboard";
import {Switch, Route, Redirect, BrowserRouter, HashRouter} from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import UserSignup from "../user/UserSignup";
import UserLogin from "../user/UserLogin";
import Navi from "../navi/Navi";
import {Component} from "react";
import {connect} from "react-redux";
import "../style/input.css";

class App extends Component {

    render() {

        let {isLoggedIn} = this.props.loginState;

        return (
            <div className="App">
                <HashRouter>
                    <Container fluid className="container">
                        <Navi/>
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            {!isLoggedIn && <Route path="/login" component={UserLogin}/>}
                            <Route exact path="/signup" component={UserSignup}/>
                            <Route exact path="/cart" component={CartDetail}/>
                            <Redirect to="/"/>
                        </Switch>
                    </Container>
                </HashRouter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginState: state.authReducer
    }
}

export default connect(mapStateToProps)(App);
