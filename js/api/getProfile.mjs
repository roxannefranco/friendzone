import { url } from "../config.mjs";
import { getToken } from "../functions.mjs";

/**
 * Get profile
 * @param {string} name
 * @returns
 */
export default async function getProfile(name) {
  try {
    const response = await fetch(`${url}/profiles/${name}?_followers=true`, {
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
