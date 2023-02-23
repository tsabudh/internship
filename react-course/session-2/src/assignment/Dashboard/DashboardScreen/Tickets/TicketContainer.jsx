import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

import "./ticket-container.scss"

const TicketContainer = ({ ticketArray, setTicketArray }) => {
  return (
    <div className="ticket_container">
      <TicketHeader />
      <TicketTable ticketArray={ticketArray} setTicketArray={setTicketArray} />
    </div>
  );
};

export default TicketContainer;
