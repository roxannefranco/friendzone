import { url } from "./config.js";
import {
  checkNotAuth,
  signOut,
  getToken,
  reactionGenerator,
  tagsGenerator,
} from "./functions.js";

checkNotAuth();

const signOutBtn = document.querySelector("#sign-out-btn");

// when clicked user signs out
signOutBtn.onclick = signOut;

/**
 * Fetch posts
 */
async function getPosts() {
  const response = await fetch(`${url}/posts?_author=true&_reactions=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  const data = await response.json();
  addPosts(data);
}

/**
 * Adding posts to HTML
 * @param {array} posts
 */
function addPosts(posts) {
  const postContainer = document.querySelector("#posts-container");
  posts.forEach(function (post) {
    // check if user uploaded avatar
    let avatar = "images/noavatar.jpg";
    if (post.author.avatar !== "" && post.author.avatar != null) {
      avatar = post.author.avatar;
    }

    postContainer.innerHTML += `<div class="mt-4 border border-neutral-300 rounded-md p-3">
    <div class="flex items-center">
        <a href="profile.html">
            <img width="32" height="32" src="${avatar}" class="rounded-full mr-2 object-cover w-10 h-10" />
        </a>
        <div class="font-bold">${post.author.name}</div>
    </div>
    <p class="text-neutral-800 mt-2 font-medium text-lg">${post.title}</p>
    <p class="text-neutral-600 mb-2">${post.body}</p>
    <div class="flex items-center mb-2">
    ${tagsGenerator(post.tags)}
    </div>
    <div class="flex items-center">
    ${reactionGenerator(post.reactions)}
    </div>
</div>`;
  });
}

getPosts();
