import React from "react";
import Bookmark from "./Bookmark/Bookmark";
import DashboardScreen from "./DashboardScreen/DashboardScreen";

class Dashboard extends React.Component {
  render() {
    return (
        <div className="dashboard">
            <Bookmark />
            <DashboardScreen />

        </div>
    )
  }
}
export default Dashboard;