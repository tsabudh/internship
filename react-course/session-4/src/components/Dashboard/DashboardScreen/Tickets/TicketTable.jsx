import React, { useContext } from "react";

import Ticket from "./Ticket";
import {ticketContext} from "../DashboardScreen";
import "./ticket-table.scss";

const TicketTable = () => {
  const { ticketArray, setTicketArray, searchKey, filterBy } =
    useContext(ticketContext);

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
              if (filterBy.length == 0) {
                return ticket;
              } else {
                // return ticket.ticketPriority == filterBy;

                return filterBy.includes(ticket.ticketPriority);
              }
            })

            .map((ticket, index) => (
              <Ticket
                ticketArray={ticketArray}
                setTicketArray={setTicketArray}
                ticketDetails={ticket}
                key={index}
                currentTicketId={ticket.id}
                // currentTicket={index}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
