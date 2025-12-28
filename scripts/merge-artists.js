export function mergeArtists(artists) {
    let artistsNames = "";
    artists.forEach((artist, index) => {
        artistsNames += artist.name;
        if (index !== artists.length - 1) {
            artistsNames += ", ";
        }
    })
    return artistsNames;
}