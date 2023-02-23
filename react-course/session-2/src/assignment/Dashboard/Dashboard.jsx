import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import DashboardScreen from "./DashboardScreen/DashboardScreen";
import "./dashboard.scss"
function Dashboard () {
  
    return (
        <div className="dashboard">
          
            <Sidebar />
            <DashboardScreen />
        </div>
    )
  
}
export default Dashboard;