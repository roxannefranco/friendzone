import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Delete a post
 * @param {string} id
 * @returns
 */
export default async function deletePost(id) {
  try {
    const response = await fetch(`${url}/posts/${id}`, {
      method: "DELETE",
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
