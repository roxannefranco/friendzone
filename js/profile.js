import { url } from "./config.js";
import {
  checkNotAuth,
  replaceAvatar,
  signOut,
  getToken,
  replaceUserProfile,
} from "./functions.js";

checkNotAuth();
replaceAvatar();
replaceUserProfile();

const signOutBtn = document.querySelector("#sign-out-btn");
// when clicked user signs out
signOutBtn.onclick = signOut;

const urlParams = new URLSearchParams(window.location.search);
let name = null;
if (urlParams.has("name")) {
  name = urlParams.get("name");
}
/**
 * Fetch Profile
 */
async function getProfile() {
  const response = await fetch(`${url}/profiles/${name}?_followers=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  const data = await response.json();
  console.log(data);
  userProfile(data);
}
getProfile();

// getting user data
async function userProfile(userInfo) {
  const name = document.querySelector("#user-name");
  const avatar = document.querySelector("#user-avatar");
  const followers = document.querySelector("#user-followers");
  const email = document.querySelector("#user-email");
  const avatarFollowers = document.querySelector("#avatar-followers");

  name.innerHTML = userInfo.name;
  if (userInfo.avatar != null && userInfo.avatar != "") {
    avatar.src = userInfo.avatar;
  }
  let followerText = "follower";
  if (userInfo._count.followers > 1 || userInfo._count.followers === 0) {
    followerText += "s";
  }
  followers.innerHTML = `${userInfo._count.followers} ${followerText}`;
  email.innerHTML = userInfo.email;

  userInfo.followers.forEach(function (follower) {
    if (follower.avatar != "" && follower.avatar != null) {
      avatarFollowers.innerHTML += `<img src="${follower.avatar}" class="rounded-full w-8 h-8 object-cover block" />`;
    } else {
      avatarFollowers.innerHTML += `<img src="images/noavatar.jpg" class="rounded-full w-8 h-8 object-cover block" />`;
    }
  });
}

// fetch posts by user name
