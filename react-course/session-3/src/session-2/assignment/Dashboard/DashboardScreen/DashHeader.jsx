
import React, { useState } from "react";

const Details = ({ userName, searchStatus, setSearchStatus, searchKey , handleSearch}) => {

  const [notificationState, setNotificationState] = useState(false);

  const showNotification = () => {
    setNotificationState(!notificationState);
  };

  const showSearch = () => {
    setSearchStatus(!searchStatus);
  };

  return (
    <div className="dashboard_screen_details">
      <div className="icons vl">
        {searchStatus && <input type="search" onChange={handleSearch} value={searchKey}/>}

        <i className="icon-search" onClick={showSearch}></i>
        <i className="icon-notification" onClick={showNotification}></i>

        {notificationState && <div className="notification-dropdown">
          
          </div>}
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

const DashHeader = ({ title, searchStatus, setSearchStatus, searchKey,handleSearch }) => {
  return (
    <div className="dashboard_screen_header">
      <h3>{title}</h3>
      <Details
        userName="Jones Ferdinand"
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        searchKey={searchKey}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default DashHeader;
