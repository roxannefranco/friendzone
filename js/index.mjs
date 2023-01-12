import runLogin from "./pages/login.mjs";
import runFeed from "./pages/feed.mjs";
import runRegister from "./pages/register.mjs";
import runSingle from "./pages/single.mjs";
import runProfile from "./pages/profile.mjs";

const path = window.location.pathname;

if (path === "/login.html") {
  runLogin();
} else if (path === "/index.html" || path === "/") {
  runFeed();
} else if (path === "/register.html") {
  runRegister();
} else if (path === "/single.html") {
  runSingle();
} else if (path === "/profile.html") {
  runProfile();
} else {
  window.location.replace("/index.html");
}
