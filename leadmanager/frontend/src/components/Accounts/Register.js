import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import React, { useState, useEffect } from "react";
import { registerUser } from "../../store/Auth/Actions";

const Register = props => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  let { isAuthenticated, registerUser, isLoading } = props;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  let { username, email, password, password2 } = user;

  const onSubmit = e => {
    e.preventDefault();
    if (password === password2) {
      if (!username && !password && !email) {
        Toast.fire({
          icon: "info",
          title: "Username, Email and Password is required."
        });
      } else {
        registerUser(user);
      }
    } else {
      Toast.fire({
        icon: "info",
        title: "Passwords don't match."
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  return (
    <div className="col-md-6 m-auto">
      <div
        className="card card-body mt-5 bg-light"
        style={{
          boxShadow: "5px 5px 12px 0px rgba(0, 0, 0, 0.08)",
          border: "0px"
        }}
      >
        <h2 className="text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              id="password2"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
              className="form-control"
            />
          </div>
          <div className="form-group text-right">
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <Spinner colorClass="text-light" size="spinner-border-sm" />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { registerUser })(Register);
