import React from "react";
import DashHeader from "./DashHeader";

export default class DashboardScreen extends React.Component{
    render(){
        return (
            <div className="dashboard__screen">
                <DashHeader title="Tickets" />
            </div>
        )
    }
}

