import '../../App.css';
import {Container, Row} from "react-bootstrap";
import Dashboard from "./Dashboard";
import {Switch, Route, Redirect} from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import UserSignup from "../user/UserSignup";
import UserLogin from "../user/UserLogin";
import Navi from "../navi/Navi";
import {Component} from "react";

class App extends Component {

    render() {
        const isLoggedIn = false;

        return (
            <div className="App">
                <Container>
                    <Navi/>
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/signup" component={UserSignup}/>
                        {!isLoggedIn && (<Route exact path="/login" component={UserLogin}/>)}
                        <Route exact path="/cart" component={CartDetail}/>
                        <Redirect to="/"/>
                    </Switch>
                </Container>
            </div>
        );
    }

}

export default App;
