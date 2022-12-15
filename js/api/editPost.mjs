import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Edit a post
 * @param {object} body
 * @param {string} id
 * @returns
 */
export default async function editPost(body, id) {
  try {
    const response = await fetch(`${url}/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
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
