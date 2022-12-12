import { url } from "./config.js";
import {
  checkNotAuth,
  signOut,
  getToken,
  reactionGenerator,
  tagsGenerator,
  replaceAvatar,
  replaceUserProfile,
} from "./functions.js";

checkNotAuth();
replaceAvatar();
replaceUserProfile();

const signOutBtn = document.querySelector("#sign-out-btn");

// when clicked user signs out
signOutBtn.onclick = signOut;

const urlParams = new URLSearchParams(window.location.search);
let id = null;
if (urlParams.has("id")) {
  id = urlParams.get("id");
}

/**
 * Fetch post
 */
async function getPost() {
  const response = await fetch(
    `${url}/posts/${id}?_author=true&_reactions=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    }
  );
  const data = await response.json();
  addPost(data);
}

/**
 * Adding posts to HTML
 * @param {object} post
 */
function addPost(post) {
  const postContainer = document.querySelector("#posts-container");
  postContainer.innerHTML = "";
  // check if user uploaded avatar
  let avatar = "images/noavatar.jpg";
  if (post.author.avatar !== "" && post.author.avatar != null) {
    avatar = post.author.avatar;
  }

  // check if post has media to display
  let media = "";
  if (post.media !== "" && post.media != null) {
    media = `<img class="mb-2 rounded-md" src="${post.media}">`;
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
    ${media}
    <div class="flex items-center mb-2">
    ${tagsGenerator(post.tags)}
    </div>
    <div class="flex items-center">
    ${reactionGenerator(post.reactions)}
    </div>
</div>`;

  const title = document.querySelector("#title-post");
  const body = document.querySelector("#body-post");
  const tags = document.querySelector("#tags-post");
  const mediaField = document.querySelector("#media-post");

  title.value = post.title;
  body.value = post.body;
  tags.value = post.tags.join(", ");

  mediaField.value = post.media;
}
getPost();

// delete a post

const deleteBtn = document.querySelector("#delete-btn");
deleteBtn.onclick = async function () {
  const response = await fetch(`${url}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  const data = await response.json();
  if (data === 204) {
    window.location.replace("/index.html");
  } else {
    const errors = document.querySelector("#errors");
    errors.classList.remove("hidden");
    let errorsList = "";
    data.errors.forEach(function (error) {
      errorsList += `<p>${error.message}</p>`;
    });
    errors.innerHTML = errorsList;
  }
};

const editBtn = document.querySelector("#edit-btn");
const form = document.querySelector("#posts-form");
const cancelBtn = document.querySelector("#cancel-btn");

// edit and cancel buttons
editBtn.onclick = function () {
  form.classList.remove("hidden");
};
cancelBtn.onclick = function (e) {
  e.preventDefault();
  form.classList.add("hidden");
};

form.onsubmit = async function (event) {
  event.preventDefault();
  const errorsContainer = document.querySelector("#errors");
  errorsContainer.classList.add("hidden");

  const title = document.querySelector("#title-post");
  const body = document.querySelector("#body-post");
  const tags = document.querySelector("#tags-post");
  const mediaField = document.querySelector("#media-post");

  // split tags by comma and loop through each tag to trim extra spaces
  const tagsList = tags.value.split(",").map(function (tag) {
    return tag.trim();
  });
  const data = {
    title: title.value,
    body: body.value,
    tags: tagsList,
    media: mediaField.value,
  };

  // Update my post
  const response = await fetch(`${url}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
  const info = await response.json();
  if ("errors" in info) {
    const errors = document.querySelector("#errors");
    errors.classList.remove("hidden");
    let errorsList = "";
    info.errors.forEach(function (error) {
      errorsList += `<p>${error.message}</p>`;
    });
    errors.innerHTML = errorsList;
  } else {
    window.location.reload();
  }
};
