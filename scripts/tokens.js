import { getCookie, setCookie } from "./cookies.js";
import { APP_URL } from "./config.js"

export async function getAccessToken() {
    const accessToken = getCookie("accessToken");
    const scopes = getCookie("scopes");

    if (accessToken !== null) {
        return accessToken;
    }
    const refreshToken = getCookie("refreshToken");

    if (refreshToken === null) {
        if (!(window.location.href === APP_URL + "/signin")) {
            window.location.href = "/signin"
        }
        return null;
    } else {
        return await refreshAccessToken(refreshToken, scopes);
    }
}

async function refreshAccessToken(refreshToken, scopes) {
    try {
        const response = await fetch("/api/get/refresh/token", {
            method: "GET",
            headers: {
                "refreshToken": refreshToken,
                "scopes": scopes,
            }
        })

        if (!response.ok) {
            throw new Error(`Http error! status ${response.status}`);
        }

        const data = await response.json();

        setCookie("accessToken", data.accessToken, data.expiresIn / 86400);
        if (data.refreshToken !== null) {
            setCookie("refreshToken", data.refreshToken, 30);
        }
        console.log("Tokens stored in cookies!");

        return data.accessToken;

    } catch(error) {
        console.error("Error fetching tokens:", error, ", re-attempting login.");
        if (!(window.location.href === APP_URL + "/signin")) {
            window.location.href = "/signin"
        }
    }
}