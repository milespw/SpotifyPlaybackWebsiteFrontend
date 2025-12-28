import { getCookie } from "./cookies.js";

window.onload = function () {
    const accessToken = getCookie("accessToken");

    fetch("/api/get/user", {
        method: "GET",
        headers: {
            "accessToken": accessToken
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Http error! status ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            createProfileHTML(data);
        })
};

function createProfileHTML(user) {
    const profileContainer = document.getElementById("profile");
    const html = `
    <h2>${user.displayName ?? "N/A"}</h2>
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Email:</strong> ${user.email ?? "N/A"}</p>
    <p><strong>Country:</strong> ${user.country ?? "N/A"}</p>
    <p><strong>Birthdate:</strong> ${user.birthdate ?? "N/A"}</p>
    <p><strong>Followers:</strong> ${user.followers?.total ?? "N/A"}</p>
    <p><strong>Spotify URL:</strong> <a href="${user.externalUrls?.spotify}" target="_blank">${user.externalUrls?.spotify}</a></p>
    <div class="image-text"><strong>Images:</strong></div>
    <div>
      ${user.images?.map(img => `<img src="${img.url}" width="100" style="margin: 5px;">`).join('')}
    </div>
    `;
    profileContainer.innerHTML = html;
}