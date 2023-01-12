import { checkAuth } from "../functions.mjs";
import postLogin from "../api/login.mjs";

export default function runLogin() {
  checkAuth();

  const form = document.querySelector("#login-form");

  form.onsubmit = function (event) {
    // prevents default submission
    event.preventDefault();
    const errorsLogin = document.querySelector("#errors-login");
    errorsLogin.classList.add("hidden");
    logInUser();
  };

  /**
   * Check if inputs match registrated user data
   */
  async function logInUser() {
    const emailLogin = document.querySelector("#email-login");
    const passwordLogin = document.querySelector("#password-login");

    const data = {
      email: emailLogin.value,
      password: passwordLogin.value,
    };

    const response = await postLogin(data);
    if ("errors" in response) {
      // show errors to user
      const errorsLogin = document.querySelector("#errors-login");
      errorsLogin.classList.remove("hidden");
      const { errors } = response;
      errorsLogin.innerHTML = "";
      errors.map(function (error) {
        const { message } = error;
        errorsLogin.innerHTML += `<p>${message}</p>`;
      });
    } else {
      // set token to local storage
      const { accessToken } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(response));

      // redirecting login to feed page
      window.location.replace("/index.html");
    }
  }
}
