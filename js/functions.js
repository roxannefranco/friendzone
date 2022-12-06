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
