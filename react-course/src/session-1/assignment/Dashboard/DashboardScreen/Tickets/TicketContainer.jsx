import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

const TicketContainer = ({ searchKey,  filterBy,handleFilterBy, handleFilter, filterMenuStatus,  }) => {
  return (
    <div className="ticket_container">
      <TicketHeader
        handleFilter={handleFilter}
        filterMenuStatus={filterMenuStatus}
        filterBy={filterBy}
        handleFilterBy={handleFilterBy}
      />
      <TicketTable searchKey={searchKey} filterBy={filterBy}/>
    </div>
  );
};

export default TicketContainer;
