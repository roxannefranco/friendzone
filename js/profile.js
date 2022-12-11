import { checkNotAuth, replaceAvatar, signOut } from "./functions.js";

checkNotAuth();
replaceAvatar();

const signOutBtn = document.querySelector("#sign-out-btn");
// when clicked user signs out
signOutBtn.onclick = signOut;
