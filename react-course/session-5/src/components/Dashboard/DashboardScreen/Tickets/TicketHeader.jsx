import { useContext, useState } from "react";
import Modal from "react-modal";

import { ticketContext } from "../DashboardScreen";
import { AddTicketForm } from "./AddTicketForm";
import "./ticket-header.scss";

Modal.setAppElement("#root");
let customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TicketHeader = ({ handleFilter, handleFilterBy, filterMenuStatus }) => {
  const { filterBy } = useContext(ticketContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const isFilterActive = () => {
    return filterBy.length > 0 ? `active` : ``;
  };

  const addTicket = () => {
    setModalOpen(true);
  };

  const afterOpenModal = () => {
    // subtitle.style.color = '#f00';
  };

  function closeModal() {
    setModalOpen(false);
    // also keep filled form as filled 
  }

  return (
    <div className="ticket_header">
      <Modal
        isOpen={isModalOpen}
        contentLabel="Ticket Modal"
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <AddTicketForm />
      </Modal>

      <p>All Tickets</p>
      <div className="ticket_classify">
        <button onClick={addTicket}>Add Ticket</button>
        <button>
          <i className="icon-sort"></i>
          Sort
        </button>
        <button onClick={handleFilter}>
          <i className={`icon-filter ${isFilterActive()}`}></i>
          Filter
        </button>
        {filterMenuStatus && (
          <div className="filter-menu">
            <ol>
              <li>
                <input
                  type="checkbox"
                  name="filterTicket"
                  id="filter-high"
                  value="high"
                  onChange={handleFilterBy}
                  checked={filterBy.includes("high")}
                />
                <label htmlFor="filter-high">High</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="filterTicket"
                  id="filter-normal"
                  value="normal"
                  onChange={handleFilterBy}
                  checked={filterBy.includes("normal")}
                />
                <label htmlFor="filter-normal">Normal</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="filterTicket"
                  id="filter-low"
                  value="low"
                  onChange={handleFilterBy}
                  checked={filterBy.includes("low")}
                />
                <label htmlFor="filter-low">Low</label>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketHeader;
