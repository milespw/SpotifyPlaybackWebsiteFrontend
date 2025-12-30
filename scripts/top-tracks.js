import { getAccessToken } from "./tokens.js";
import { mergeArtists } from "./merge-artists.js";

window.onload = async function () {
    const accessToken = await getAccessToken();

    const params = new URLSearchParams(window.location.search);
    const timeRange = params.get("time_range") ?? "short_term";
    fetch(`/api/get/top/tracks?time_range=${timeRange}`, {
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
            createHTML(data["items"]);
        })
}

function createHTML(tracks) {
    const container = document.getElementById('content');

    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'item';

        const img = document.createElement('img');
        img.src = track.album.images[0].url;
        img.alt = track.album.name;

        const details = document.createElement('div');
        details.className = 'item-details';

        const title = document.createElement('h3');
        title.textContent = track.name;

        const album = document.createElement('p');
        album.innerHTML = `<strong>Album:</strong> ${track.album.name}`;

        const artist = document.createElement('p');
        artist.innerHTML = `<strong>Artist:</strong> ${mergeArtists(track.artists)}`;

        const link = document.createElement('p');
        link.innerHTML = `<a href="${track.externalUrls.externalUrls.spotify}" target="_blank">Listen on Spotify</a>`;

        details.appendChild(title);
        details.appendChild(album);
        details.appendChild(artist);
        details.appendChild(link);

        trackDiv.appendChild(img);
        trackDiv.appendChild(details);

        container.appendChild(trackDiv);
    });
}