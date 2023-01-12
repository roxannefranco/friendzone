import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Get posts by tag
 * @param {string} queryParam
 * @returns
 */
export default async function getPostsByTag(queryParam) {
  try {
    const response = await fetch(
      `${url}/posts?_author=true&_reactions=true${queryParam}`,
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
