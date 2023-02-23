import { useState, useEffect } from "react";
import axios from "axios";
import { deleteTicket } from "../../../Login/handleRequest";

const Ticket = ({
  ticketArray,
  setTicketArray,
  ticketDetails,
  currentTicketId,
}) => {
  const deleteCurrentTicket = async () => {
   let deleteStatus =  await deleteTicket(currentTicketId, setTicketArray);

    let newArray = ticketArray.filter((ticket) => {
      if (currentTicketId ==  ticket.id) return;
      else return ticket;
    });
    if(deleteStatus==200)  setTicketArray(newArray);
  };

  return (
    <tr>
      <td>
        <div className="ticket-details">
          <div className="customer-avatar">
            <img
              src={ticketDetails.customerAvatar}
              alt={ticketDetails.customerAvatar}
            />
          </div>

          <div className="wrapper">
            <div className="ticket-name"> {ticketDetails.ticketName}</div>
            <div className="ticket-information">
              {ticketDetails.ticketInformation}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="customer-name"> {ticketDetails.customerName}</div>
        <div className="customer-date">{ticketDetails.customerDate}</div>
      </td>
      <td>
        <div className="ticket-date">{ticketDetails.ticketDate}</div>
        <div className="ticket-time">{ticketDetails.ticketTime}</div>
      </td>
      <td>
        <div
          className={`ticket-priority ticket-priority--${ticketDetails.ticketPriority}`}
        >
          {ticketDetails.ticketPriority}
        </div>
      </td>
      <td>
        <div className="ticket-delete">
          <button onClick={deleteCurrentTicket}>
            <i className="icon-bin"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Ticket;
