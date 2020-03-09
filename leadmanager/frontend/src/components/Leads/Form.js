import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import React, { useState, useEffect } from "react";
import { addLead, updateLead } from "../../store/Leads/Actions";

const Form = ({ addLoading, updateLoading, current, addLead, updateLead }) => {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    if (current !== null) {
      setLead(current);
    } else {
      setLead({
        name: "",
        email: "",
        message: ""
      });
    }
  }, [current]);

  const onChange = e =>
    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });

  const { name, email, message } = lead;

  const onSubmit = async e => {
    e.preventDefault();
    if (!name && !email) {
      Toast.fire({
        icon: "error",
        title: "Name and Email is required."
      });
    } else {
      if (current === null) {
        addLead(lead);
        setLead({
          name: "",
          email: "",
          message: ""
        });
      } else {
        updateLead(lead);
      }
    }
  };

  return (
    <div
      className="card mt-4 mb-5 bg-light"
      style={{
        boxShadow: "5px 5px 12px 0px rgba(0, 0, 0, 0.08)",
        border: "0px"
      }}
    >
      <div className="card-header bg-primary">
        <h1 className="text-white">
          {current === null ? "Add" : "Update"} Lead
        </h1>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="lead-name">Lead Name</label>
            <input
              type="text"
              name="name"
              id="lead-name"
              value={name}
              onChange={onChange}
              placeholder="Lead Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lead-email">Lead Email</label>
            <input
              type="email"
              name="email"
              id="lead-email"
              value={email}
              onChange={onChange}
              placeholder="Lead Email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lead-message">Lead Message</label>
            <textarea
              rows="6"
              name="message"
              id="lead-message"
              value={message}
              onChange={onChange}
              className="form-control"
              placeholder="Lead Meassage"
            ></textarea>
          </div>
          <div className="form-group text-right">
            <button
              className="btn btn-primary"
              disabled={addLoading || updateLoading}
              style={{ minWidth: "4rem !important" }}
            >
              {addLoading || updateLoading ? (
                <Spinner colorClass="text-light" size="spinner-border-sm" />
              ) : current === null ? (
                "Submit"
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  current: state.leads.currentLead,
  addLoading: state.leads.newLeadLoading,
  updateLoading: state.leads.updateLeadLoading
});

export default connect(mapStateToProps, { addLead, updateLead })(Form);
