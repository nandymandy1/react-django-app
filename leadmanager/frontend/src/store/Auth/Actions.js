import ax from "axios";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_LOADING,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS
} from "./types";

import { resetLeads } from "../Leads/Actions";

// Check the token and Load User
export const loadUser = () => async (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  try {
    let { data } = await ax.get("/api/auth/user", await tokenConfig(getState));
    dispatch({
      payload: data,
      type: USER_LOADED
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login the User
export const loginUser = user => async dispatch => {
  dispatch(setLoading());
  try {
    let { data } = await ax.post("/api/auth/login", user);
    dispatch({
      payload: data,
      type: LOGIN_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
  }
};

// Register the User
export const registerUser = user => async dispatch => {
  dispatch(setLoading());
  try {
    let { data } = await ax.post("/api/auth/register", user);
    dispatch({
      payload: data,
      type: REGISTER_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Logout User
export const logoutUser = () => async (dispatch, getState) => {
  try {
    resetLeads();
    await ax.post("/api/auth/logout", null, await tokenConfig(getState));
    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Set Loading
export const setLoading = () => {
  return {
    type: AUTH_LOADING
  };
};

// Setup Config with token
export const tokenConfig = async getState => {
  // Get the token from the state
  const token = await getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
