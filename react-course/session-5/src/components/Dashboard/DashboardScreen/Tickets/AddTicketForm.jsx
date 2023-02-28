import "./add-ticket-form.scss";
export const AddTicketForm = () => {
  return (
    <form action="" id="add-ticket-form">
      <h3>Add Ticket</h3>
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
        <label htmlFor="customer-name">Customer Name</label>
        <input
          type="email"
          id="customer-name"
          placeholder="Customer Name"
          name="customerName"
        />
      </div>
      <div className="input_group">
        <label htmlFor="ticket-priority-enum">Ticket Priority</label>
        {/* <select
          name="ticket-priority-enum"
          id="ticket-priority-enum"
          form="add-ticket-form"
        >
          <option value="high">High</option>
          <option value="low">Low</option>
          <option value="normal" selected={true}>
            Normal
          </option>
        </select> */}

        <div className="">
          <input
            className="inline"
            type="radio"
            name="ticket-priority-enum"
            id="ticket-priority-high"
          />
          <label className="inline" htmlFor="ticket-priority-high">
            High
          </label>
        </div>

        <div className="">
          <input
            type="radio"
            name="ticket-priority-enum"
            id="ticket-priority-normal"
            className="inline"
          />
          <label htmlFor="ticket-priority-normal" className="inline">
            Normal
          </label>
        </div>
        <div className="">
          <input
            type="radio"
            name="ticket-priority-enum"
            id="ticket-priority-low"
            className="inline"
          />
          <label htmlFor="ticket-priority-low" className="inline">
            Low
          </label>
        </div>
      </div>

      <button id="login-button" type="button" onClick={null}>
        Add ticket
      </button>
    </form>
  );
};
