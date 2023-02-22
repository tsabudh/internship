import axios from "axios";

// let serverUrl = "http://localhost:3000";

let serverUrl = "https://my-json-server.typicode.com/tsabudh/json-server";

export async function loginUser(navigate) {
  
  let response = await fetch(`${serverUrl}/users`);
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
    .delete(`${serverUrl}/tickets/${ticketId}`)
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
    .get(`${serverUrl}/tickets`)
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
