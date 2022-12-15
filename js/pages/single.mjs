import apiGetPost from "../api/getPost.mjs";
import apiDeletePost from "../api/deletePost.mjs";
import apiEditPost from "../api/editPost.mjs";
import {
  checkNotAuth,
  signOut,
  reactionGenerator,
  tagsGenerator,
  replaceAvatar,
  replaceUserProfile,
  getUser,
} from "../functions.mjs";

export default function runSingle() {
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
    const data = await apiGetPost(id);
    addPost(data);
  }

  /**
   * Adding posts to HTML
   * @param {object} post
   */
  function addPost(post) {
    const { author, media, body, title, tags, reactions } = post;
    const postContainer = document.querySelector("#posts-container");
    postContainer.innerHTML = "";
    // check if user uploaded avatar
    let avatar = "images/noavatar.jpg";
    if (author.avatar !== "" && author.avatar != null) {
      avatar = author.avatar;
    }

    // check if post has media to display
    let img = "";
    if (media !== "" && media != null) {
      img = `<img class="mb-2 rounded-md h-auto w-full" src="${media}">`;
    }

    const loggedUser = getUser();
    if (loggedUser.name === author.name) {
      const btns = document.querySelector("#btns");
      btns.classList.remove("hidden");
    }

    postContainer.innerHTML += `<div class="mt-4 border border-neutral-300 rounded-md p-3">
    <div>
        <a class="flex items-center" href="profile.html?name=${author.name}">
            <img width="32" height="32" src="${avatar}" class="rounded-full mr-2 object-cover w-10 h-10" />
            <div class="font-bold">${author.name}</div>
        </a>
    </div>
    <p class="text-neutral-800 mt-2 font-medium text-lg">${title}</p>
    <p class="text-neutral-600 mb-2">${body}</p>
    ${img}
    <div class="flex items-center mb-2">
    ${tagsGenerator(tags)}
    </div>
    <div class="flex items-center">
    ${reactionGenerator(reactions)}
    </div>
</div>`;

    const titleField = document.querySelector("#title-post");
    const bodyField = document.querySelector("#body-post");
    const tagsField = document.querySelector("#tags-post");
    const mediaField = document.querySelector("#media-post");

    titleField.value = title;
    bodyField.value = body;
    tagsField.value = tags.join(", ");

    mediaField.value = media;
  }
  getPost();

  // delete a post

  const deleteBtn = document.querySelector("#delete-btn");
  deleteBtn.onclick = async function () {
    const data = await apiDeletePost(id);
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
    const response = await apiEditPost(data, id);
    if ("errors" in response) {
      const errorsSingle = document.querySelector("#errors");
      errorsSingle.classList.remove("hidden");
      const { errors } = response;
      errorsSingle.innerHTML = "";
      errors.map(function (error) {
        const { message } = error;
        errorsLogin.innerHTML += `<p>${message}</p>`;
      });
    } else {
      window.location.reload();
    }
  };
}
