import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Create a new post
 * @param {object} body
 * @returns
 */
export default async function newPost(body) {
  try {
    const response = await fetch(`${url}/posts`, {
      method: "POST",
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
