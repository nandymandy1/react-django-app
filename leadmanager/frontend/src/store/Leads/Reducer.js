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

const leadState = {
  leads: [],
  currentLead: null,
  leadsLoading: false,
  newLeadLoading: false,
  updateLeadLoading: false,
  deleteLeadLoading: false
};

export default (state = leadState, { type, payload }) => {
  switch (type) {
    case GET_LEAD_LOADING:
      return {
        ...state,
        leadsLoading: !state.leadsLoading
      };
    case GET_LEADS:
      return {
        ...state,
        leads: payload,
        leadsLoading: !state.leadsLoading
      };
    case NEW_LEAD_LOADING:
      return {
        ...state,
        newLeadLoading: !state.newLeadLoading
      };
    case NEW_LEAD:
      return {
        ...state,
        leads: [...state.leads, payload],
        newLeadLoading: !state.newLeadLoading
      };
    case DEL_LEAD_LOADING:
      return {
        ...state,
        deleteLeadLoading: !state.deleteLeadLoading
      };
    case DELETE_LEAD:
      return {
        ...state,
        currentLead: null,
        leads: state.leads.filter(lead => lead.id !== payload),
        deleteLeadLoading: !state.deleteLeadLoading
      };
    case SET_CURRENT:
      return {
        ...state,
        currentLead: state.leads.find(x => x.id === payload)
      };
    case PUT_LEAD_LOADING:
      return {
        ...state,
        updateLeadLoading: !state.updateLeadLoading
      };
    case UPDATE_LEAD:
      return {
        ...state,
        currentLead: null,
        updateLeadLoading: !state.updateLeadLoading,
        leads: state.leads.map(lead =>
          lead.id === payload.id ? payload : lead
        )
      };
    default:
      return {
        ...state
      };
  }
};
