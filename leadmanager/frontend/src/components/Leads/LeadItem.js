import React from "react";
import { connect } from "react-redux";
import { deleteLead, setCurrent } from "../../store/Leads/Actions";

const LeadItem = ({
  lead: { id, name, message, email },
  deleteLead,
  setCurrent
}) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{message}</td>
      <td>
        <button className="btn btn-danger mr-2" onClick={() => deleteLead(id)}>
          Delete
        </button>
        <button className="btn btn-info" onClick={() => setCurrent(id)}>
          Edit
        </button>
      </td>
      <td></td>
    </tr>
  );
};

export default connect(null, { deleteLead, setCurrent })(LeadItem);
