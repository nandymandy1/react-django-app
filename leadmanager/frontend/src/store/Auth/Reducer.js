import {
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  AUTH_LOADING,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS
} from "./types";

const authState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: localStorage.getItem("token")
};

export default (state = authState, { type, payload }) => {
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isLoading: false,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
      Toast.fire({
        icon: "success",
        title: `Welcome! ${payload.user.username}`
      });
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLoading: false,
        user: payload.user,
        isAuthenticated: true,
        token: payload.token
      };
    case REGISTER_SUCCESS:
      Toast.fire({
        icon: "success",
        title: `Welcome! ${payload.user.username}`
      });
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLoading: false,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      };
    case LOGOUT_SUCCESS:
      Toast.fire({
        icon: "success",
        title: `Logged out successfully.`
      });
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      };
    case LOGIN_FAIL:
      Toast.fire({
        icon: "error",
        title: `${payload.non_field_errors}`
      });
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      };
    case REGISTER_FAIL:
      Toast.fire({
        icon: "error",
        title: `${payload.non_field_errors[0]}`
      });
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return {
        ...state
      };
  }
};
