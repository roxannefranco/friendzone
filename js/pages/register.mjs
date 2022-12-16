import { checkAuth } from "../functions.mjs";
import postRegister from "../api/register.mjs";

export default function runRegister() {
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
    const passwordConfirmation = document.querySelector(
      "#confirmation-password"
    );
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
    const email = document.querySelector("#email-login");
    const avatar = document.querySelector("#avatar");
    const password = document.querySelector("#password");
    const data = {
      name: username.value,
      email: email.value,
      avatar: avatar.value,
      password: password.value,
    };
    const response = await postRegister(data);
    if ("errors" in response) {
      const errorsRegister = document.querySelector("#errors-server");
      errorsRegister.classList.remove("hidden");
      const { errors } = response;
      errorsRegister.innerHTML = "";
      errors.map(function (error) {
        const { message } = error;
        errorsRegister.innerHTML += `<p>${message}</p>`;
      });
    } else {
      // if response is ok redirect to log in page
      window.location.replace("/login.html");
    }
  }
}
