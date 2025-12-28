import { getCookie } from "./cookies.js";

window.onload = function () {
    if (getCookie("accessToken")) {
        window.location.href = "/";
    }
}

function signInWithSpotify() {
    fetch("/api/get/spotifyUrl")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Http error! status ${response.status}`);
            }

            return response.text();
        })
        .then(data => {
            window.location.href = data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

window.signInWithSpotify = signInWithSpotify();