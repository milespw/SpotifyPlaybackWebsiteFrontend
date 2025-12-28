import { getAccessToken } from "./tokens.js";

window.onload = async function () {
    const accessToken = await getAccessToken();

    fetch("/api/get/top/artists", {
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

function createHTML(contents) {
    const container = document.getElementById('content');

    contents.forEach(content => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const img = document.createElement('img');
        img.src = content.images[0].url;
        img.alt = content.name;

        const details = document.createElement('div');
        details.className = 'item-details';

        const name = document.createElement('h3');
        name.textContent = content.name;

        const followers = document.createElement('p');
        let followersFormatted = "N/A";
        if (content.followers.total) {
            followersFormatted = Number(content.followers.total).toLocaleString("en-US");
        }
        followers.innerHTML = `<strong>Followers:</strong> ${followersFormatted}`

        const link = document.createElement('p');
        link.innerHTML = `<a href="${content.externalUrls.externalUrls.spotify}" target="_blank">Listen on Spotify</a>`;

        details.appendChild(name);
        details.appendChild(followers);
        details.appendChild(link);

        itemDiv.appendChild(img);
        itemDiv.appendChild(details);

        container.appendChild(itemDiv)
    })
}