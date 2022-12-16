import apiGetPosts from "../api/getPosts.mjs";
import apiNewPost from "../api/newPost.mjs";
import apiGetPostsByTag from "../api/getPostsByTag.mjs";
import {
  checkNotAuth,
  signOut,
  reactionGenerator,
  tagsGenerator,
  replaceAvatar,
  replaceUserProfile,
} from "../functions.mjs";

export default function runFeed() {
  checkNotAuth();
  replaceAvatar();
  replaceUserProfile();

  const signOutBtn = document.querySelector("#sign-out-btn");

  // when clicked user signs out
  signOutBtn.onclick = signOut;

  let allPosts = [];
  let term = "";

  /**
   * Fetch posts
   */
  async function getPosts() {
    allPosts = await apiGetPosts();
    addPosts(allPosts);
  }

  /**
   * Adding posts to HTML
   * @param {array} posts
   */
  function addPosts(posts, ignoreTags = false) {
    const postContainer = document.querySelector("#posts-container");
    postContainer.innerHTML = "";
    let sortedTags = [];
    posts.forEach(function (post) {
      const { id, author, media, body, tags, reactions, title } = post;
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

      // check tags used on the post
      if (!ignoreTags) {
        tags.map(function (tag) {
          if (tag != "" && tag != null) {
            const foundTag = sortedTags.find(function (t) {
              return t.tag === tag;
            });
            if (foundTag != null) {
              // exists then check its position
              const key = Object.keys(sortedTags).find(function (k) {
                return sortedTags[k].tag === tag;
              });
              sortedTags[key].total += 1;
            } else {
              //does not exist then add
              sortedTags.push({ tag: tag, total: 1 });
            }
          }
        });
      }

      postContainer.innerHTML += `
    <a href="single.html?id=${id}" class="block mt-4 border border-neutral-300 hover:bg-neutral-100 rounded-md p-3">
      <div class="flex items-center">
          <img width="32" height="32" src="${avatar}" class="rounded-full mr-2 object-cover w-10 h-10" />
          <div class="text-neutral-800 font-bold">@${author.name}</div>
      </div>
      <p class="text-neutral-800 mt-2 font-medium text-lg">${title}</p>
      <p class="text-neutral-600 mb-2">${body}</p>
      ${img}
      <div class="flex flex-wrap items-center mb-2">
        ${tagsGenerator(tags)}
      </div>
      <div class="flex items-center">
        ${reactionGenerator(reactions)}
      </div>
    </a>`;
    });

    if (!ignoreTags) {
      sortedTags = sortedTags.sort(function (a, b) {
        if (a.total > b.total) return -1;
        if (a.total < b.total) return 1;
        return 0;
      });
      const topTags = sortedTags.slice(0, 5);
      const selectTags = document.querySelector("#tag-filter");
      topTags.forEach(function (tag) {
        selectTags.innerHTML += `<option value="${tag.tag}">${tag.tag}</option>`;
      });
    }
  }

  getPosts();

  const form = document.querySelector("#posts-form");

  form.onsubmit = function (event) {
    // prevention default submission occurs'
    event.preventDefault();
    // select and hidde errors container
    const errorsContainer = document.querySelector("#errors");
    errorsContainer.classList.add("hidden");
    newPost();
  };

  /**
   * Publish new post
   */
  async function newPost() {
    const title = document.querySelector("#title-post");
    const body = document.querySelector("#body-post");
    const tags = document.querySelector("#tags-post");
    const media = document.querySelector("#media-post");

    // split tags by comma and loop through each tag to trim extra spaces
    const tagsList = tags.value.split(",").map(function (tag) {
      return tag.trim();
    });

    const data = {
      title: title.value,
      body: body.value,
      tags: tagsList,
      media: media.value,
    };
    await apiNewPost(data);
    form.reset();
    getPosts();
  }

  /**
   * Handle search input
   */
  const search = document.querySelector("#search");
  search.oninput = function () {
    // convert all searches to lower case
    term = search.value.toLowerCase();
    if (term != "") {
      const filteredPosts = allPosts.filter(function (post) {
        const { body, title, author } = post;
        // check if post title includes term and returns true if yes and false if no
        return (
          title.toLowerCase().includes(term) ||
          (body != null && body.toLowerCase().includes(term)) ||
          author.name.toLowerCase().includes(term)
        );
      });
      addPosts(filteredPosts, true);
    } else {
      addPosts(allPosts, true);
    }
  };

  // Handle filter select
  const tagFilter = document.querySelector("#tag-filter");
  tagFilter.onchange = function () {
    const selectedTag = tagFilter.value;
    getPostsByTag(selectedTag);
  };

  /**
   * Get posts by tag
   */
  async function getPostsByTag(tag) {
    // check if selected tag is 0
    let queryParam = "";
    if (tag != 0) {
      queryParam = `&_tag=${tag}`;
    }

    const data = await apiGetPostsByTag(queryParam);
    allPosts = data;
    if (term != "") {
      const filteredPosts = allPosts.filter(function (post) {
        const { body, title, author } = post;
        // check if post title includes term and returns true if yes and false if no
        return (
          title.toLowerCase().includes(term) ||
          (body != null && body.toLowerCase().includes(term)) ||
          author.name.toLowerCase().includes(term)
        );
      });
      addPosts(filteredPosts, true);
    } else {
      addPosts(allPosts, true);
    }
  }
}
