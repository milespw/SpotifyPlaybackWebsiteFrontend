import { getAccessToken } from "./tokens.js";
import { mergeArtists } from "./merge-artists.js";

window.onload = async function () {
    await updateNowPlaying();
}

async function updateNowPlaying() {
    clearNowPlaying();
    const accessToken = await getAccessToken();
    const nowPlaying = await getNowPlaying(accessToken);

    const nowPlayingContainer = document.getElementById("now-playing");
    if (nowPlaying) {
        document.title = "Playing: " + nowPlaying.item.name;
        nowPlayingContainer.style.visibility = "visible";
    } else {
        document.title = "Not Playing"
        nowPlayingContainer.style.visibility = "hidden";
    }
}

window.updateNowPlaying = updateNowPlaying;

async function getNowPlaying(accessToken) {
    try {
        const response = await fetch("/api/get/now/playing", {
            method: "GET",
            headers: {
                "accessToken": accessToken
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status ${response.status}`);
        }

        const data = await response.json();

        if (data.is_playing === false) {
            return;
        }

        createNowPlayingHTML(data)

        return data;

    } catch (error) {
        console.error("Error fetching playing data:", error);
        return null;
    }
}

function createNowPlayingHTML(nowPlaying) {
    const container = document.getElementById("now-playing");

    const img = document.createElement("img");
    img.src = nowPlaying.item.album.images[0].url;
    img.alt = nowPlaying.item.album.name;

    const trackTitle = document.createElement("h3");
    trackTitle.textContent = nowPlaying.item.name;

    const album = document.createElement("p");
    album.innerHTML = `${nowPlaying.item.album.name}`;

    const artists = document.createElement("p");
    artists.innerHTML = `${mergeArtists(nowPlaying.item.artists)}`;

    container.appendChild(img);
    container.appendChild(trackTitle);
    container.appendChild(album);
    container.appendChild(artists);
}

function clearNowPlaying() {
    const container = document.getElementById("now-playing");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

// setInterval(updateNowPlaying, 5000);