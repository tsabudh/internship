
import "./ticket-header.scss"

const TicketHeader = ({ handleFilter, filterBy,handleFilterBy, filterMenuStatus }) => {

const isFilterActive = () =>{
  return filterBy.length >0?`active`:``;
}

  return (
    <div className="ticket_header">
      <p>All Tickets</p>
      <div className="ticket_classify">
        <button>
          <i className="icon-sort"></i>
          Sort
        </button>
        <button onClick={handleFilter}>
          <i className={`icon-filter ${isFilterActive()}`} ></i>
          Filter
        </button>
      { filterMenuStatus &&  <div className="filter-menu">
       <ol>
        <li>
          <input type="checkbox" name="filterTicket" id="filter-high" value="high"   onChange={handleFilterBy}  checked={filterBy.includes('high')} /> 
          <label htmlFor="filter-high">High</label>
          </li>
        <li>
          <input type="checkbox" name="filterTicket" id="filter-normal" value="normal"  onChange={handleFilterBy} checked={filterBy.includes('normal')} /> 
          <label htmlFor="filter-normal">Normal</label>
          </li>
        <li>
          <input type="checkbox" name="filterTicket" id="filter-low" value="low"  onChange={handleFilterBy} checked={filterBy.includes('low')} /> 
          <label htmlFor="filter-low">Low</label>
          </li>
       </ol>
      </div>}
      </div>
    </div>
  );
};

export default TicketHeader;
