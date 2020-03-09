import ax from "axios";
import {
  NEW_LEAD,
  GET_LEADS,
  DELETE_LEAD,
  UPDATE_LEAD,
  SET_CURRENT,
  NEW_LEAD_LOADING,
  DEL_LEAD_LOADING,
  GET_LEAD_LOADING,
  PUT_LEAD_LOADING
} from "./types";

import { tokenConfig } from "../Auth/Actions";

// Reset Leads
export const resetLeads = () => dispatch => {
  dispatch({
    payload: [],
    type: GET_LEADS
  });
};

// GET LEADS
export const getLeads = () => async (dispatch, getState) => {
  dispatch(setLoading("get"));
  try {
    let { data } = await ax.get("/api/leads/", await tokenConfig(getState));
    dispatch({
      payload: data,
      type: GET_LEADS
    });
  } catch (err) {
    dispatch(setLoading("get"));
  }
};

// CREATE A LEAD
export const addLead = newLead => async (dispatch, getState) => {
  dispatch(setLoading("post"));
  try {
    let { data } = await ax.post(
      "/api/leads/",
      newLead,
      await tokenConfig(getState)
    );
    dispatch({
      payload: data,
      type: NEW_LEAD
    });
    Toast.fire({
      icon: "success",
      title: "Lead added."
    });
  } catch (err) {
    dispatch(setLoading("post"));
    Toast.fire({
      icon: "error",
      title: "Unable to add the lead."
    });
  }
};

// DELETE A LEAD
export const deleteLead = id => async (dispatch, getState) => {
  dispatch(setLoading("delete"));
  try {
    await ax.delete(`/api/leads/${id}/`, await tokenConfig(getState));
    dispatch({
      payload: id,
      type: DELETE_LEAD
    });
    Toast.fire({
      icon: "success",
      title: "Lead deleted."
    });
  } catch (err) {
    dispatch(setLoading("delete"));
    Toast.fire({
      icon: "error",
      title: err.response.data
    });
  }
};

// SET LEAD FOR EDITING
export const setCurrent = id => async dispatch => {
  dispatch({
    payload: id,
    type: SET_CURRENT
  });
};

// UPDATE THE LEAD API
export const updateLead = lead => async (dispatch, getState) => {
  dispatch(setLoading("put"));
  try {
    let { data } = await ax.put(
      `/api/leads/${lead.id}/`,
      lead,
      await tokenConfig(getState)
    );
    dispatch({
      type: UPDATE_LEAD,
      payload: data
    });
    Toast.fire({
      icon: "success",
      title: "Lead updated."
    });
  } catch (err) {
    dispatch(setLoading("put"));
    Toast.fire({
      icon: "error",
      title: "Unable to update the lead."
    });
  }
};

// Set Loading
export const setLoading = loadingType => {
  if (loadingType === "post") {
    return {
      type: NEW_LEAD_LOADING
    };
  }

  if (loadingType === "delete") {
    return {
      type: DEL_LEAD_LOADING
    };
  }

  if (loadingType === "get") {
    return {
      type: GET_LEAD_LOADING
    };
  }

  if (loadingType === "put") {
    return {
      type: PUT_LEAD_LOADING
    };
  }
};
