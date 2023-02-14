import React from "react";

class Details extends React.Component {
  render() {
    return (
      <div className= "dashboard__screen__details">
        <i className="icon-search-lens"></i>
        <i className="icon-notification-bell-exist"></i>

        <b>{this.props.userName}</b>
        <img src="" alt={`${this.props.userName} profile photo`}></img>
      </div>
    );
  }
}

class DashHeader extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Details userName="Jones Ferdinand"/>
      </div>
    );
  }
}

export default DashHeader;
