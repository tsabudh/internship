import React from "react";
import Ticket from "./Ticket";

const TicketTable = ({
  ticketArray,
  setTicketArray,
  searchKey,
  filterBy,

}) => {
  return (
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
            ticket.ticketName
              .toLocaleLowerCase()
              .includes(searchKey.toLocaleLowerCase())
          )
          .filter((ticket) => {
            if (!filterBy) {
              return ticket;
            } else {
              return ticket.ticketPriority == filterBy;
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
          ))
          
          }
      </tbody>
    </table>
  );
};

export default TicketTable;
