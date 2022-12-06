import { url } from "./config.js";
import { checkAuth } from "./functions.js";

checkAuth();

const form = document.querySelector("#login-form");

form.onsubmit = function (event) {
  // prevents default submission
  event.preventDefault();
  const errorsLogin = document.querySelector("#errors-login");
  errorsLogin.classList.add("hidden");
  logInUser();
};

// check if inputs match registrated user data
async function logInUser() {
  const emailLogin = document.querySelector("#email-login");
  const passwordLogin = document.querySelector("#password-login");
  const data = {
    email: emailLogin.value,
    password: passwordLogin.value,
  };
  console.log(data);
  let info = await fetch(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await info.json();
  console.log(response);
  // set token to local storage
  const accessToken = response.accessToken;
  localStorage.setItem("accessToken", accessToken);
  // redirecting login to feed page
  window.location.replace("/index.html");
}
