import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

const TicketContainer = ({
  ticketArray,
  setTicketArray,
  searchKey,
  deleteTicket,
  deletedTicket,
  setDeletedTicket,
  filterBy,
  handleFilterBy,
  handleFilter,
  filterMenuStatus,
}) => {
  return (
    <div className="ticket_container">
      <TicketHeader
        handleFilter={handleFilter}
        filterMenuStatus={filterMenuStatus}
        filterBy={filterBy}
        handleFilterBy={handleFilterBy}
      />
      <TicketTable
        ticketArray={ticketArray}
        setTicketArray={setTicketArray}
        searchKey={searchKey}
        filterBy={filterBy}
        deleteTicket={deleteTicket}
        deletedTicket={deletedTicket}
        setDeletedTicket={setDeletedTicket}
      />
    </div>
  );
};

export default TicketContainer;
