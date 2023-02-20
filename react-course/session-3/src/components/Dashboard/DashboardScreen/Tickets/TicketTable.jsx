import React from "react";
import Ticket from "./Ticket";

import "./ticket-table.scss";

const TicketTable = ({ ticketArray, setTicketArray, searchKey, filterBy }) => {
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
          {ticketArray
            .filter((ticket) =>
              // filter by search string
              ticket.ticketName
                .toLocaleLowerCase()
                .includes(searchKey.toLocaleLowerCase())
            )
            .filter((ticket) => {
              // filter by ticket priority
              if (filterBy.length==0) {
                return ticket;
              } else {
                // return ticket.ticketPriority == filterBy;
                console.log(filterBy);
                return filterBy.includes(ticket.ticketPriority);
              }
            })

            .map((ticket, index) => (
              <Ticket
                ticketArray={ticketArray}
                setTicketArray={setTicketArray}
                ticketDetails={ticket}
                key={index}
                currentTicket={index}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
