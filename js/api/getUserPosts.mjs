import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Get user's posts
 * @param {string} name
 * @returns
 */
export default async function getUserPosts(name) {
  try {
    const response = await fetch(
      `${url}/profiles/${name}/posts?_reactions=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
