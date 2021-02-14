import '../../App.css';
import {Container, Row} from "react-bootstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import {Switch, Route} from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import UserSignup from "../user/UserSignup";
import UserLogin from "../user/UserLogin";

function App() {
    return (
        <div className="App">
            <Container>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/signup" component={UserSignup}/>
                    <Route exact path="/login" component={UserLogin}/>
                    <Route exact path="/cart" component={CartDetail}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
