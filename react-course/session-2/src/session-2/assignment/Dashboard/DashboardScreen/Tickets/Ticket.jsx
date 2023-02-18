import { useState } from "react";

const Ticket = ({
  ticketArray,
  setTicketArray,
  ticketDetails,
  currentTicket,
}) => {
  const deleteCurrentTicket = () => {
    let newArray = ticketArray.filter((ticket, index) => {
      if (currentTicket == index) return;
      else return ticket;
    });

    setTicketArray(newArray);
    console.log(ticketArray);
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
