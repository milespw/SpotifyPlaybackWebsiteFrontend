import { getAccessToken } from "./tokens.js";

window.onload = async function () {
    await getAccessToken();
}