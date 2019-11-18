import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SignUpContainer from "./components/SignUpContainer"
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
