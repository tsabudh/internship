import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

const TicketContainer = ({ ticketArray }) => {
  return (
    <div className="ticket_container">
      <TicketHeader />
      <TicketTable ticketArray={ticketArray} />
    </div>
  );
};

export default TicketContainer;
