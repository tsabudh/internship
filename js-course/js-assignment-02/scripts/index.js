let password = document.getElementById("password");
let numbers = "0123456789";
let lowercases = "abcdefghijklmnopqrstuvwxyz";
let uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let symbols = "!@#$%^&*()";

const passwordLength = document.getElementById("type-3").value;
console.log(passwordLength);
document.addEventListener("keydown", () => {
  console.log("pressed");
  const passwordLength = document.getElementById("type-3").value;
console.log(passwordLength);
});

function genPassword() {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  document.getElementById("password").value = password;
}

function copyPassword() {
  var copyText = document.getElementById("password");
  copyText.select();
  document.execCommand("copy");
}
