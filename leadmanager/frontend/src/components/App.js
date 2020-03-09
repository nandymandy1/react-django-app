// import "./style.css";
import store from "../store";
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import Header from "./Layout/Header";
import { Provider } from "react-redux";
import React, { Component } from "react";
import Dashboard from "./Leads/Dashboard";
import PrivateRoute from "./Common/PrivateRoute";

import { Route, Switch, HashRouter as Router } from "react-router-dom";

import Login from "./Accounts/Login";
import Footer from "./Layout/Footer";
import Register from "./Accounts/Register";
import { loadUser } from "../store/Auth/Actions";

// Toast Config
const Toast = Swal.mixin({
  toast: true,
  timer: 5000,
  position: "top-end",
  showConfirmButton: false,
  timerProgressBar: false,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

// Browser Defaults
window.Swal = global.Swal = Swal;
window.Toast = global.Toast = Toast;

class App extends Component {
  componentDidMount = () => {
    store.dispatch(loadUser());
  };

  render() {
    return (
      <Router>
        <Provider store={store}>
          <>
            <Header />
            <div className="container" style={{ minHeight: "78.5vh" }}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </>
        </Provider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
