import React from "react";
import Ticket from "./Ticket";

const TicketTable = ({ ticketArray }) => {
  return (
    <div className="table-wrapper">
      <table className="ticket_table">
        <thead>
          <tr>
            <th className="ticket_table_heading">Ticket details</th>
            <th className="ticket_table_heading">Customer name</th>
            <th className="ticket_table_heading">Date</th>
            <th className="ticket_table_heading">Priority</th>
            <th className="ticket_table_heading"></th>
          </tr>
        </thead>

        <tbody>
          {ticketArray.map((ticket, index) => (
            <Ticket ticketDetails={ticket} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
