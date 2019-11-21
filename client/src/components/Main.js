import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import SignUpContainer from "./SignUpContainer";
import LogInContainer from "./LogInContainer";
import SearchContainer from "./SearchContainer";
import Results from './Results';

const Main = () => (
    <main>
        <Switch>
            <Route exact path ="/" component={SignUpContainer}/>
            <Route path = "/login" component={LogInContainer}/>
            <Route path = "/search" component={SearchContainer}/>
            <Route path = "/results" component={Results}/>
        </Switch>
    </main>
)
export default Main
