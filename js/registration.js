import { url } from "./config.js";
import { checkAuth } from "./functions.js";

checkAuth();

const form = document.querySelector("#registration-form");

form.onsubmit = function (event) {
  // prevention default submission occurs'
  event.preventDefault();
  // select and hidde errors container
  const errorsContainer = document.querySelector("#errors");
  errorsContainer.classList.add("hidden");
  // get password inputs
  const password = document.querySelector("#password");
  const passwordConfirmation = document.querySelector("#confirmation-password");
  // check if both values are equal
  if (password.value === passwordConfirmation.value) {
    registerNew();
  } else {
    errorsContainer.classList.remove("hidden");
  }
};

/**
 * Register new User
 */
async function registerNew() {
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const avatar = document.querySelector("#avatar");
  const password = document.querySelector("#password");
  const data = {
    name: username.value,
    email: email.value,
    avatar: avatar.value,
    password: password.value,
  };
  console.log(data);
  let info = await fetch(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await info.json();
  console.log(response);
  // if response is ok redirect to log in page
  window.location.replace("/login.html");
}
