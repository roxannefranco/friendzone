import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Get single posts
 * @param {string} id
 * @returns
 */
export default async function getPost(id) {
  try {
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
    return data;
  } catch (e) {
    console.log(e);
  }
}
