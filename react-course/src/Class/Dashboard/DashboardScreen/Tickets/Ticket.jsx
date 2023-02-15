import { useState } from "react";

const Ticket = ({ ticketDetails }) => {
  return (
    <tr>
      <td>{ticketDetails.customerAvatar}</td>
      <td>
        <div className="ticket-name"> {ticketDetails.ticketName}</div>
        <div className="ticket-information">
          {ticketDetails.ticketInformation}
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
      <td>{ticketDetails.ticketPriority}</td>
    </tr>
  );
};

export default Ticket;
