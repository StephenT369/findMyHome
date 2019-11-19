import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUpContainer from "./SignUpContainer";
import LogInContainer from "./LogInContainer";

const Main = () => (
    <main>
        <Switch>
            <Route exact path ="/" component={SignUpContainer}/>
            <Route path = "/login" component={LogInContainer}/>
        </Switch>
    </main>
)
export default Main
