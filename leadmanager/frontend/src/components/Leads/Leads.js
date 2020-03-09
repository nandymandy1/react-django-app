import LeadItem from "./LeadItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { getLeads } from "../../store/Leads/Actions";
import Spinner, { SpinnerGrow } from "../Layout/Spinner";

const Leads = ({ loading, delLoading, getLeads, leads }) => {
  useEffect(() => {
    getLeads();
  }, []);

  return (
    <>
      <h1>Leads</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner colorClass="text-primary" size="spinner-border-lg" />
        </div>
      ) : (
        <table className="table table-striped table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th>
              <th scope="col">
                {delLoading ? (
                  <>
                    <SpinnerGrow /> <SpinnerGrow /> <SpinnerGrow />
                  </>
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <LeadItem key={lead.id} lead={lead} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

Leads.propTypes = {
  leads: PropTypes.array.isRequired,
  getLeads: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads.leads,
  loading: state.leads.leadsLoading,
  delLoading: state.leads.deleteLeadLoading
});

export default connect(mapStateToProps, { getLeads })(Leads);
