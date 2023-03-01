import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";

import UserModal from "../../UserModal/UserModal";

const Details = ({
  userName,
  searchStatus,
  setSearchStatus,
  searchKey,
  handleSearch,
}) => {
  const [modalStatus, setModalStatus] = useState(false);

  const handleUserModal = () => {
    setModalStatus(!modalStatus);
  };
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
        {searchStatus && (
          <input type="search" onChange={handleSearch} value={searchKey} />
        )}

        <i className="icon-search" onClick={showSearch}></i>
        <i className="icon-notification" onClick={showNotification}></i>

        {notificationState && <div className="notification-dropdown"></div>}
      </div>

      <p className="username">{userName}</p>
      <div className="profile-circle" onClick={handleUserModal}>
        <figure>
          <img
            src="/Jones-Ferdinand-profile.png"
            alt={`${userName} profile photo`}
          />
        </figure>
        <Modal isOpen={modalStatus} contentLabel={"User Modal"}>
          <UserModal />
        </Modal>
      </div>
    </div>
  );
};

const DashHeader = ({
  searchStatus,
  setSearchStatus,
  searchKey,
  handleSearch,
}) => {
  const title = useLocation().pathname.split("/")[2];

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
