import React from "react";
import Form from "./Form";
import Leads from "./Leads";

const Dashboard = () => {
  return (
    <>
      <Form />
      <div className="mb-5">
        <Leads />
      </div>
    </>
  );
};

export default Dashboard;
