import axios from "axios";

export const addTicket = () => {
  let ticketForm = document.querySelector("#add-ticket-form");
  let formData = new FormData(ticketForm);
  console.log(...formData);

  let ticketObject = {};
  formData.forEach(function (value, key) {
    ticketObject[key] = value;
  });

  let dateAndTime = new Date(ticketObject.ticketDateAndTime);
  const options = { year: "numeric", month: "short", day: "numeric" };
  // console.log(dateAndTime.toLocaleDateString(undefined, options));
  ticketObject.ticketDate = dateAndTime.toLocaleDateString(undefined, options);
  ticketObject.customerAvatar = `/${ticketObject.customerName.replaceAll(
    " ",
    "-"
  )}`;
  ticketObject.customerDate = ticketObject.customerDate.replaceAll("-", ".");
  console.log(ticketObject);
  postTicket(ticketObject);
};

const postTicket = async (ticketObject) => {
  await axios.post("http://localhost:3000/tickets", ticketObject);
};
