export function checkAuth() {
  const token = localStorage.getItem("accessToken");
  if (token != null) {
    // if if token is stored then user is authenticated
    window.location.replace("/index.html");
  }
}

export function checkNotAuth() {
  const token = localStorage.getItem("accessToken");
  if (token == null) {
    // if there is no token stored then user is not authenticated
    window.location.replace("/login.html");
  }
}
