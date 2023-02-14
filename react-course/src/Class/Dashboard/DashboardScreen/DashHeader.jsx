import React from "react";

class Details extends React.Component {
  render() {
    return (
      <div className="dashboard_screen_details">
        <i className="icon-search-lens"></i>
        <i className="icon-notification-bell-exist"></i>

        <b>{this.props.userName}</b>
        <div className="profile-circle">
          <img
            src="Jones-Ferdinand-profile.png"
            alt={`${this.props.userName} profile photo`}
          ></img>
        </div>
      </div>
    );
  }
}

class DashHeader extends React.Component {
  render() {
    return (
      <div className="dashboard_screen_header">
        <h3>{this.props.title}</h3>
        <Details userName="Jones Ferdinand" />
      </div>
    );
  }
}

export default DashHeader;
