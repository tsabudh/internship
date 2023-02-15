import React from "react";
import Ticket from "./Ticket";

let tickets = [
  {
    customerName: "Tom Cruise",
    customerDate: "24.05.2019",
    customerAvatar:"O",
    ticketDate: "May 26, 2019",
    ticketTime: "6:30 PM",
    ticketName:"Contact Email not Linked",
    ticketInformation:"Updated 1 day ago",
    ticketPriority:"high",
  },
  {
    customerName: "Matt Damon",
    customerDate: "24.05.2019",
    customerAvatar:"O",
    ticketDate: "May 26, 2019",
    ticketTime: "8:00 AM",
    ticketName:"Adding Images to Featured Posts",
    ticketInformation:"Updated 1 day ago",
    ticketPriority:"low",
  },
  {
    customerName: "Robert Downey",
    customerDate: "24.05.2019",
    customerAvatar:"O",
    ticketDate: "May 26, 2019",
    ticketTime: "7:30 PM",
    ticketName:"When will I be charged this month?",
    ticketInformation:"Updated 1 day ago",
    ticketPriority:"high",
  },
];

const TicketTable = () => {
  return (
    <table className="ticket_table">
      <thead>
        <tr>
          <th className="ticket_table_heading">Ticket Details</th>
          <th className="ticket_table_heading">Customer Name</th>
          <th className="ticket_table_heading">Date</th>
          <th className="ticket_table_heading">Priority</th>
        </tr>
      </thead>
      
      <tbody>
       
          <Ticket ticketDetails={tickets[0]} />
       
      </tbody>
    </table>
  );
};

export default TicketTable;
