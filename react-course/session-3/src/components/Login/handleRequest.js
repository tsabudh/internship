import { useNavigate } from "react-router-dom";

export async function loginUser(navigate) {
  let response = await fetch("http://localhost:3000/users");
  let users = await response.json();
  let enteredEmail = document.getElementById("email").value;

  let enteredPassword = document.getElementById("password").value;
  let candidateUser = users.find((user) => {
    return user.email == enteredEmail;
  });

  candidateUser && candidateUser.password == enteredPassword
    ? navigate('/dashboard')
    : "Bigryo password";
}
