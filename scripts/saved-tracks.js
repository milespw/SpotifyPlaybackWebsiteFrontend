import { getAccessToken } from "./tokens.js";

window.addEventListener("load", async function () {
    const accessToken = await getAccessToken();
    const params = new URLSearchParams((new URL(window.location.href)).search);
    const pageNo = Number.isNaN(parseInt(params.get("page"), 10)) ? 0 : parseInt(params.get("page"), 10);

    console.log(pageNo);

    fetch("/api/get/user/saved/tracks", {
        method: "GET",
        headers: {
            "accessToken": accessToken,
            "page": pageNo
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Http error! status ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            createHTML(data)
        })
});

function createHTML(data) {
    const container = document.getElementById("content");

    const tracks = data.items;

    tracks.forEach(track => {
        const item = track.track;

        const trackDiv = document.createElement("div");
        trackDiv.className = "item";

        const img = document.createElement("img");
        img.src = item.album.images[0].url;
        img.alt = item.album.name;

        const details = document.createElement("div");
        details.className = "item-details";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const album = document.createElement("p");
        album.innerHTML = `<strong>Album:</strong> ${item.album.name}`;

        const artist = document.createElement("p");
        artist.innerHTML = `<strong>Artist:</strong> ${item.artists[0].name}`;

        const link = document.createElement("p");
        link.innerHTML = `<a href="${item.externalUrls.externalUrls.spotify}" target="_blank">Listen on Spotify</a>`;

        details.appendChild(title);
        details.appendChild(album);
        details.appendChild(artist);
        details.appendChild(link);

        trackDiv.appendChild(img);
        trackDiv.appendChild(details);

        container.appendChild(trackDiv);
    })
}