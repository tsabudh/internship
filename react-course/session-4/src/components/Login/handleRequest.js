import axios from "axios";

let ticketUrl = "http://localhost:3000/tickets";

export async function loginUser(navigate) {
  
  let response = await fetch("http://localhost:3000/users");
  let users = await response.json();
  let enteredEmail = document.getElementById("email").value;

  let enteredPassword = document.getElementById("password").value;
  let candidateUser = users.find((user) => {
    return user.email == enteredEmail;
  });

  candidateUser && candidateUser.password == enteredPassword
    ? navigate("/dashboard")
    : "Wrong Email or password.";
}

export async function deleteTicket(ticketId, setTicketArray) {
  let response, statusCode;
  response = await axios
    .delete(`${ticketUrl}/${ticketId}`)
    .then(function (response) {
      // handle success
      statusCode = response.status;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  return statusCode;
}

export async function getTickets(setTicketArray) {
  let tickets = [];

  await axios
    .get(ticketUrl)
    .then(function (response) {
      setTicketArray(response.data);
      tickets = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(tickets);
  return tickets;
}
