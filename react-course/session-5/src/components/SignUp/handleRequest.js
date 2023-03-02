import axios from "axios";

// let serverUrl = "http://localhost:3000";

// let serverUrl = "https://my-json-server.typicode.com/tsabudh/json-server";

export let serverUrl =
  "https://react-course-a299d-default-rtdb.asia-southeast1.firebasedatabase.app/";
const getFormData = (formId) => {
  let form = document.getElementById(formId);
  let formData = new FormData(form);
  return formData;
};

export let handleLogin = (
  navigate,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser
) => {
  let formData = getFormData("portal-form");
  let enteredEmail = formData.get("email");
  let loginButton = document.getElementById("login-button");

  let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    enteredEmail
  );

  if (validEmail) {
    loginButton.textContent = "Logging in";
    loginUser(navigate, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser);
  } else {
    console.log("entered valid email?", validEmail);
  }
};

async function loginUser(
  navigate,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser
) {
  let response = await fetch(`${serverUrl}/users`);
  let users = await response.json();
  let enteredEmail = document.getElementById("email").value;
  let loginButton = document.getElementById("login-button");
  let formInstruction = document.querySelector(".instruction");

  let enteredPassword = document.getElementById("password").value;
  let candidateUser = users.find((user) => {
    return user.email == enteredEmail;
  });

  if (candidateUser && candidateUser.password == enteredPassword) {
    loginButton.style.background = "#16FF00";

    setIsLoggedIn(true);
    setCurrentUser(candidateUser);
    navigate("/dashboard/overview");
  } else {
    loginButton.textContent = "Login";
    formInstruction.style.color = "#CD0404";
    formInstruction.textContent = `Wrong Email or Password. Try again`;
    console.log("Wrong Email or password.");
  }
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

// export async function getTickets(setTicketArray) {
//   let tickets = [];

//   await axios
//     .get(`${serverUrl}/tickets`)
//     .then(function (response) {
//       setTicketArray(response.data);
//       tickets = response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   return tickets;
// }

export const getTickets = async (setTicketArray) => {
  await axios
    .get(
      `https://react-course-a299d-default-rtdb.asia-southeast1.firebasedatabase.app/tickets.json`
    )
    .then((response) => {
      const ticketsArray = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        nodeName: key,
      }));
      console.log(ticketsArray);
      setTicketArray(ticketsArray);
    });
};
