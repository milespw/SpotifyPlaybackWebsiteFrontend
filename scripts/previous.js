import { getAccessToken } from "./tokens.js";
import { mergeArtists } from "./merge-artists.js";

window.onload = async function() {
    const accessToken = await getAccessToken();
    await getPreviouslyPlayed(accessToken);
}
async function getPreviouslyPlayed(accessToken) {
    try {
        const response = await fetch("/api/get/now/recentlyPlayed", {
            method: "GET",
            headers: {
                "accessToken": accessToken
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        createPreviouslyPlayedHTML(data["items"]);

    } catch (error) {
        console.error("Error fetching history data:", error);
    }
}

function createPreviouslyPlayedHTML(previouslyPlayed) {
    const container = document.getElementById("previous-content");

    const nowPlaying = document.getElementById("now-playing");
    if (nowPlaying && nowPlaying.textContent.trim() !== "") {
        container.style.marginTop = "20px";
    }

    previouslyPlayed.forEach(played => {
        const item = document.createElement("div");
        item.className = "item";

        const img = document.createElement("img");
        img.src = played.track.album.images[0].url;
        img.alt = played.track.album.name;

        const details = document.createElement("div");
        details.className = "item-details";

        const title = document.createElement("h3");
        title.textContent = played.track.name;

        const album = document.createElement("p");
        album.innerHTML = `<strong>Album:</strong> ${played.track.album.name}`;

        const artist = document.createElement('p');
        artist.innerHTML = `<strong>Artist:</strong> ${mergeArtists(played.track.artists)}`;

        const link = document.createElement('p');
        link.innerHTML = `<a href="${played.track.externalUrls.externalUrls.spotify}" target="_blank">Listen on Spotify</a>`;

        details.appendChild(title);
        details.appendChild(album);
        details.appendChild(artist);
        details.appendChild(link);

        item.appendChild(img);
        item.appendChild(details);

        container.appendChild(item);
    })
}