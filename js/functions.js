/**
 * Get token
 * @returns {string} token - prefixed access token to authorize users
 */
export function getToken() {
  const token = localStorage.getItem("accessToken");
  return `Bearer ${token}`;
}

/**
 * Get user
 * @returns {object} user
 */
export function getUser() {
  const user = localStorage.getItem("user");
  // parses user string to object
  return JSON.parse(user);
}

/**
 * Replace user's avatar if one was provided
 */
export function replaceAvatar() {
  const user = getUser();
  if (user.avatar != null && user.avatar != "") {
    const currentAvatar = document.querySelector("#current-avatar");
    currentAvatar.src = user.avatar;
  }
}

/**
 * Checks if User is logged in
 */
export function checkAuth() {
  const token = localStorage.getItem("accessToken");
  if (token != null) {
    // if if token is stored then user is authenticated
    window.location.replace("/index.html");
  }
}

/**
 * Cheks if user is not logged in
 */
export function checkNotAuth() {
  const token = localStorage.getItem("accessToken");
  if (token == null) {
    // if there is no token stored then user is not authenticated
    window.location.replace("/login.html");
  }
}

/**
 * Removes token and signs out the user
 */
export function signOut() {
  localStorage.removeItem("accessToken");
  // after removing token user is redirected to login
  window.location.replace("/login.html");
}

/**
 * Generates reactions HTML
 * @param {array} reactions
 * @returns {string}
 */
export function reactionGenerator(reactions) {
  let structure = "";
  reactions.forEach(function (reaction) {
    structure += `
      <div class="border border-orange-300 rounded-md mr-2 px-2">
        ${reaction.symbol}
        ${reaction.count}
      </div>
    `;
  });
  return structure;
}

/**
 * Generates tags HTML
 * @param {array} tags
 * @returns {string}
 */
export function tagsGenerator(tags) {
  let structure = "";
  tags.forEach(function (tag) {
    structure += `
  <div class="border border-orange-300 rounded-md mr-2 px-2">
        #${tag}
      </div>
  `;
  });
  return structure;
}
