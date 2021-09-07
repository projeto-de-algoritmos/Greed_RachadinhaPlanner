import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { Simulator } from "./pages/Simulator";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/simulacao"
            component={Simulator}
          />
        </Switch>
      </Router>
     <ToastContainer />
    </div>
  );
}

export default App;
