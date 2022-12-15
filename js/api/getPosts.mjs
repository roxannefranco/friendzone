import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Get all posts
 * @returns
 */
export default async function getPosts() {
  try {
    const response = await fetch(`${url}/posts?_author=true&_reactions=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
