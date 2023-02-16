import React from "react";
import DashHeader from "./DashHeader";
import TicketContainer from "./Tickets/TicketContainer";
export default class DashboardScreen extends React.Component{
    render(){
        return (
            <div className="dashboard_screen">
                <DashHeader title="Tickets" />
                <TicketContainer />
            </div>
        )
    }
}

