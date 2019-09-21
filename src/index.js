import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "unstated";

import "assets/scss/material-kit-react.scss?v=1.8.0";


// pages for this product

import Notes from "views/Notes/Notes"

var hist = createBrowserHistory();

ReactDOM.render(
    <Provider>
        <Notes />
    </Provider >,
    document.getElementById("root")
);
