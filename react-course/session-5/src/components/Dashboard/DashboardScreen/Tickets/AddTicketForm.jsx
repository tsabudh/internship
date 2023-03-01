import { useEffect } from "react";
import { addTicket } from "./ticketHandler";
import "./add-ticket-form.scss";

export const AddTicketForm = () => {
  useEffect(() => {
    document.getElementById("customer-date").valueAsDate = new Date();
  }, []);
  return (
    <form action="" id="add-ticket-form">
      <h3>Add Ticket</h3>
      <div className="wrapper-flex">
        <div className="input_group">
          <label htmlFor="ticket-name">Ticket Name</label>
          <input
            type="text"
            id="ticket-name"
            placeholder="Ticket Name"
            name="ticketName"
          />
        </div>

        <div className="input_group">
          <label htmlFor="ticket-date-time">Ticket Date and Time:</label>

          <input
            type="datetime-local"
            id="ticket-date-time"
            name="ticketDateAndTime"
            value="2018-06-12T19:30"
            min="2018-06-07T00:00"
            max="2025-06-14T00:00"
          />
        </div>
      </div>

      <div className="wrapper-flex">
        <div className="input_group">
          <label htmlFor="customer-name">Customer Name</label>
          <input
            type="email"
            id="customer-name"
            placeholder="Customer Name"
            name="customerName"
          />
        </div>
        <div className="input_group">
          <label htmlFor="customer-date">Customer Date</label>
          <input
            type="date"
            id="customer-date"
            placeholder="Customer Date"
            name="customerDate"
            defaultValue={new Date()}
          />
        </div>
      </div>

      <div className="input_group">
        <label htmlFor="ticket-priority">Ticket Priority</label>
        <div className="wrapper-flex">
          <div className="">
            <input
              className="inline"
              type="radio"
              name="ticketPriority"
              id="ticket-priority-high"
              value="high"
            />
            <label className="inline" htmlFor="ticket-priority-high">
              High
            </label>
          </div>

          <div className="">
            <input
              type="radio"
              name="ticketPriority"
              id="ticket-priority-normal"
              className="inline"
              value="normal"
              defaultChecked
            />
            <label htmlFor="ticket-priority-normal" className="inline">
              Normal
            </label>
          </div>
          <div className="">
            <input
              type="radio"
              name="ticketPriority"
              id="ticket-priority-low"
              className="inline"
              value="low"
            />
            <label htmlFor="ticket-priority-low" className="inline">
              Low
            </label>
          </div>
        </div>
      </div>

      <button id="login-button" type="button" onClick={addTicket}>
        Add ticket
      </button>
    </form>
  );
};
