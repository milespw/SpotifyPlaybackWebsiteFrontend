import { setCookie } from "./cookies.js";

window.onload = function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");

    fetch(`/api/get/tokens`, {
        method: "GET",
        headers: {
            "code": code
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Http error! status ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            setCookie("accessToken", data.accessToken, data.expiresIn / 86400);
            setCookie("refreshToken", data.refreshToken, 30);
            setCookie("scopes", data.scope, 365);
            console.log("Tokens stored in cookies!");
            window.location.href = "/";
        })
        .catch(error => {
            console.error("Error fetching tokens:", error);
        });
}

