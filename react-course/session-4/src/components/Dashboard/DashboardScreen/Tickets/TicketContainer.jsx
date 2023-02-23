import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

import "./ticket-container.scss";

const TicketContainer = ({
  // ticketArray,
  // setTicketArray,
  // searchKey,
  // filterBy,
  handleFilterBy,
  handleFilter,
  filterMenuStatus,
}) => {
  return (
    <div className="ticket_container">
      <TicketHeader
        handleFilter={handleFilter}
        filterMenuStatus={filterMenuStatus}
        handleFilterBy={handleFilterBy}
      />
      <TicketTable />
    </div>
  );
};

export default TicketContainer;
