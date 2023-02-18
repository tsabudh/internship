const TicketHeader = ({}) => {
  return (
    <div className="ticket_header">
      <p>All Tickets</p>
      <div className="ticket_classify">
        <button>
          <i className="icon-sort"></i>
          Sort
        </button>
        <button>
          <i className="icon-filter"></i>
          Filter
        </button>
      </div>
    </div>
  );
};

export default TicketHeader;
