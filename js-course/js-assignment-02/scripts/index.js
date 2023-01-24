const body = document.getElementsByTagName("body")[0];

createChildOf(body, {
  tagName: "div",
  classes: "box",
});
const box = document.getElementsByClassName("box")[0];
createChildOf(box, {
  tagName: "h2",
  text: "Random Password Generator",
});
createChildOf(box, {
  tagName: "div",
  classes: "options",
});
const options = document.getElementsByClassName("options")[0];


let optionArray = [
  { labelText: "Numbers", id: "type-number" },
  { labelText: "Lowercase", id: "type-lowercase" },
  { labelText: "Uppercase", id: "type-uppercase" },
  { labelText: "Symbols", id: "type-symbol" },
  { labelText: "Length", id: "type-length", type: "text" },
];

optionArray.map((item) => {
  let option = document.createElement("div");
  option.setAttribute("class", "option");

  let label = document.createElement("label");
  label.setAttribute("for", item?.id);
  let labelText = document.createTextNode(item?.labelText);

  let input = document.createElement("input");
  input.setAttribute("type", item?.type || "checkbox");
  input.setAttribute("name", "option");
  input.setAttribute("id", item?.id);

  options.appendChild(option);

  option.appendChild(label);
  label.appendChild(labelText);

  option.appendChild(input);
});

//* INPUT FIELD TO GENERATE PASSWORD
createSiblingAfter(options, {
  tagName: "input",
  type: "text",
  placeholder: "Create Password",
  id: "password",
});
createChildOf(box, {
  tagName: "div",
  classes: "buttons",
});
const buttons = document.getElementsByClassName("buttons")[0];
const buttonElements = [
  { text: "Generate", onclick: "genPassword()" },
  { text: "Copy", onclick: "copyPassword()" },
];

createSiblingAfter(options, {
  tagName:"div",
  classes:"instruction",
  text:"Click on Generate to generate password!"
})
const instructions = document.getElementsByClassName("instruction")[0];

buttonElements.map((item) => {
  let button = document.createElement("div");
  button.setAttribute("class", "btn");
  button.setAttribute("onclick", item?.onclick);
  let buttonText = document.createTextNode(item?.text);

  buttons.appendChild(button);
  button.appendChild(buttonText);
});

//* FUNCTIONS TO CREATE SIBLINGS
function createSiblingAfter(e, passedObject) {
  const {
    tagName,
    classes,
    onclick,
    text,
    id,
    href,
    target,
    alt,
    placeholder,
  } = passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (alt) newElement.setAttribute("alt", alt);
  if (placeholder) newElement.setAttribute("placeholder", placeholder);

  e.insertAdjacentElement("afterend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
}

function createChildOf(e, passedObject) {
  const { tagName, classes, onclick, text, id, href, target, src, alt } =
    passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (src) newElement.setAttribute("src", src);
  if (alt) newElement.setAttribute("alt", alt);

  e.insertAdjacentElement("beforeend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
}

//*Assigning default value of 8 to password length
document.getElementById("type-length").value = 8;

const numbers = "0123456789";
const lowercases = "abcdefghijklmnopqrstuvwxyz";
const uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = "!@#$%^&*()";

const passwordField = document.getElementById("password");
const numberCheckbox = document.getElementById("type-number");
const lowercaseCheckbox = document.getElementById("type-lowercase");
const uppercaseCheckbox = document.getElementById("type-uppercase");
const symbolCheckbox = document.getElementById("type-symbol");
const lengthField = document.getElementById("type-length");

function genPassword() {
 

  let chars = "";
  //check if numbers is checked
  if (numberCheckbox.checked) {
    chars = chars.concat(numbers);
  }

  //check if lowercase is checked
  if (lowercaseCheckbox.checked) {
    chars = chars.concat(lowercases);
  }

  //check if uppercase is checked
  if (uppercaseCheckbox.checked) {
    chars = chars.concat(uppercases);
  }

  //check if symbols is checked
  if (symbolCheckbox.checked) {
    chars = chars.concat(symbols);
  }

  if (
    !(
      symbolCheckbox.checked ||
      uppercaseCheckbox.checked ||
      lowercaseCheckbox.checked ||
      numberCheckbox.checked
    )
  ) {
    //* error state 😡
    console.log("not selected");
    passwordField.classList.add("error");

    //*give instructions to check at least one option
    let instructionText = instructions.textContent = "Please check at least one option!";
    instructions.textContent = instructionText;
  } else {
    passwordField.classList.remove("error");
    instructions.textContent = "You can copy the generated password using copy button.";


  }
  console.log(chars);
  let passwordLength = lengthField.value;

  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  passwordField.value = password;
}

function copyPassword() {
  var copyText = document.getElementById("password");
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
}
