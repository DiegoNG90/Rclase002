import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from '../Pages/Home/Home'
import MutationTry from '../Pages/MutationTry/MutationTry';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/mutation">
                    <MutationTry />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
     );
}

export default Routes;