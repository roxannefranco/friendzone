import apiGetProfile from "../api/getProfile.mjs";
import apiGetUserPosts from "../api/getUserPosts.mjs";
import {
  checkNotAuth,
  replaceAvatar,
  signOut,
  replaceUserProfile,
  tagsGenerator,
  reactionGenerator,
} from "../functions.mjs";

export default function runProfile() {
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
    const data = await apiGetProfile(name);
    userProfile(data);
  }
  getProfile();

  // getting user data
  async function userProfile(userInfo) {
    const { name, avatar, _count, followers, email } = userInfo;
    const nameUser = document.querySelector("#user-name");
    const avatarContainer = document.querySelector("#user-avatar");
    const followersContainer = document.querySelector("#user-followers");
    const emailContainer = document.querySelector("#user-email");
    const avatarFollowers = document.querySelector("#avatar-followers");

    nameUser.innerHTML = name;
    if (avatar != null && avatar != "") {
      avatarContainer.src = avatar;
    }
    let followerText = "follower";
    if (_count.followers > 1 || _count.followers === 0) {
      followerText += "s";
    }
    followersContainer.innerHTML = `${_count.followers} ${followerText}`;
    emailContainer.innerHTML = email;

    followers.forEach(function (follower) {
      const { avatar: a, name: n } = follower;
      if (a != "" && a != null) {
        avatarFollowers.innerHTML += `<a href="profile.html?name=${n}"><img src="${a}" class="rounded-full w-8 h-8 object-cover block" /></a>`;
      } else {
        avatarFollowers.innerHTML += `<a href="profile.html?name=${n}"><img src="images/noavatar.jpg" class="rounded-full w-8 h-8 object-cover block" /></a>`;
      }
    });
  }

  // fetch posts by user name
  async function userPostsProfile() {
    const info = await apiGetUserPosts(name);

    // adding user posts to user profile
    const userPosts = document.querySelector("#user-posts");
    info.forEach(function (post) {
      const { media, id, title, body, tags, reactions } = post;
      // check if post has media to display
      let img = "";
      if (media !== "" && media != null) {
        img = `<img class="mb-2 rounded-md h-auto w-full" src="${media}">`;
      }
      userPosts.innerHTML += `
    <a href="single.html?id=${id}" class="block mt-4 border border-neutral-300 hover:bg-neutral-100 rounded-md p-3">
      <p class="text-neutral-800 mt-2 font-medium text-lg">${title}</p>
      <p class="text-neutral-600 mb-2">${body}</p>
      ${img}
      <div class="flex items-center mb-2">
        ${tagsGenerator(tags)}
      </div>
      <div class="flex items-center">
        ${reactionGenerator(reactions)}
      </div>
    </a>`;
    });
  }
  userPostsProfile();
}
