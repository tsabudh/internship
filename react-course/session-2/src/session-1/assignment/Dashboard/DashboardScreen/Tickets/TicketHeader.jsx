const TicketHeader = ({ handleFilter, filterBy,handleFilterBy, filterMenuStatus }) => {
  return (
    <div className="ticket_header">
      <p>All Tickets</p>
      <div className="ticket_classify">
        <button>
          <i className="icon-sort"></i>
          Sort
        </button>
        <button onClick={handleFilter}>
          <i className="icon-filter" ></i>
          Filter
        </button>
      { filterMenuStatus &&  <div className="filter-menu">
       <ol>
        <li>
          <input type="radio" name="filterTicket" id="filter-high" value="high"   onChange={handleFilterBy} /> 
          <label htmlFor="filter-high">High</label>
          </li>
        <li>
          <input type="radio" name="filterTicket" id="filter-normal" value="normal"  onChange={handleFilterBy}/> 
          <label htmlFor="filter-normal">Normal</label>
          </li>
        <li>
          <input type="radio" name="filterTicket" id="filter-low" value="low"  onChange={handleFilterBy}/> 
          <label htmlFor="filter-low">Low</label>
          </li>
       </ol>
      </div>}
      </div>
    </div>
  );
};

export default TicketHeader;
