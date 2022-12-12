import { url } from "./config.js";
import {
  checkNotAuth,
  replaceAvatar,
  signOut,
  getToken,
  replaceUserProfile,
  tagsGenerator,
  reactionGenerator,
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
  const nameUser = document.querySelector("#user-name");
  const avatar = document.querySelector("#user-avatar");
  const followers = document.querySelector("#user-followers");
  const email = document.querySelector("#user-email");
  const avatarFollowers = document.querySelector("#avatar-followers");

  nameUser.innerHTML = userInfo.name;
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
      avatarFollowers.innerHTML += `<a href="profile.html?name=${follower.name}"><img src="${follower.avatar}" class="rounded-full w-8 h-8 object-cover block" /></a>`;
    } else {
      avatarFollowers.innerHTML += `<a/ href="profile.html?name=${follower.name}"<img src="images/noavatar.jpg" class="rounded-full w-8 h-8 object-cover block" /></a>`;
    }
  });
}

// fetch posts by user name
async function userPostsProfile() {
  const response = await fetch(
    `${url}/profiles/${name}/posts?_reactions=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    }
  );
  const info = await response.json();

  // adding user posts to user profile
  const userPosts = document.querySelector("#user-posts");
  info.forEach(function (post) {
    // check if post has media to display
    let media = "";
    if (post.media !== "" && post.media != null) {
      media = `<img class="mb-2 rounded-md" src="${post.media}">`;
    }
    userPosts.innerHTML += `
    <a href="single.html?id=${
      post.id
    }" class="block mt-4 border border-neutral-300 hover:bg-neutral-100 rounded-md p-3">
      <p class="text-neutral-800 mt-2 font-medium text-lg">${post.title}</p>
      <p class="text-neutral-600 mb-2">${post.body}</p>
      ${media}
      <div class="flex items-center mb-2">
        ${tagsGenerator(post.tags)}
      </div>
      <div class="flex items-center">
        ${reactionGenerator(post.reactions)}
      </div>
    </a>`;
  });
}
userPostsProfile();
