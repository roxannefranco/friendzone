import { url } from "../config.mjs";

/**
 * Register user on api
 * @param {object} body
 * @returns
 */
export default async function postRegister(body) {
  try {
    const response = await fetch(`${url}/auth/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
