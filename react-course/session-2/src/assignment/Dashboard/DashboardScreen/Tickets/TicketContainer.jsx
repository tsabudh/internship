import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

const TicketContainer = ({ ticketArray, setTicketArray }) => {
  return (
    <div className="ticket_container">
      <TicketHeader />
      <TicketTable ticketArray={ticketArray} setTicketArray={setTicketArray} />
    </div>
  );
};

export default TicketContainer;
