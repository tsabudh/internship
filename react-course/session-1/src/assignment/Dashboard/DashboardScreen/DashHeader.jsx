import React, { useState } from "react";

const Details = ({ userName }) => {
  return (
    <div className="dashboard_screen_details">
      <div className="icons vl">
        <i className="icon-search"></i>
        <i className="icon-notification"></i>
      </div>

      <p className="username">{userName}</p>
      <div className="profile-circle">
        <figure>
          <img
            src="Jones-Ferdinand-profile.png"
            alt={`${userName} profile photo`}
          />
        </figure>
      </div>
    </div>
  );
};

const DashHeader = ({ title }) => {
  return (
    <div className="dashboard_screen_header">
      <h3>{title}</h3>
      <Details userName="Jones Ferdinand" />
    </div>
  );
};

export default DashHeader;
