import { url } from "./config.js";
import { checkNotAuth, signOut } from "./functions.js";

checkNotAuth();

const signOutBtn = document.querySelector("#sign-out-btn");

// when clicked user signs out
signOutBtn.onclick = signOut;
