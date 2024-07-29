document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("genreDropdown");
    const playlistDiv = document.getElementById("playlist");

    const playlists = {
        rock: ["Bohemian Rhapsody - Queen", "Hotel California - Eagles", "Stairway to Heaven - Led Zeppelin"],
        jazz: ["So What - Miles Davis", "Take Five - Dave Brubeck", "Feeling Good - Nina Simone"],
        classical: ["Fur Elise - Beethoven", "Canon in D - Pachelbel", "The Four Seasons - Vivaldi"],
        pop: ["Thriller - Michael Jackson", "Shape of You - Ed Sheeran", "Blinding Lights - The Weeknd"]
    };

    const backgroundColors = {
        rock: "black",
        jazz: "blue",
        classical: "lightgrey",
        pop: "pink"
    };

    dropdown.addEventListener("change", function() {
        const selectedGenre = dropdown.value;
        updateBackground(selectedGenre);
        updatePlaylist(selectedGenre);
    });

    function updateBackground(genre) {
        document.body.style.backgroundColor = backgroundColors[genre] || "white";
    }

    function updatePlaylist(genre) {
        const songs = playlists[genre] || [];
        playlistDiv.innerHTML = "";
        const ul = document.createElement("ul");

        songs.forEach(song => {
            const li = document.createElement("li");
            li.textContent = song;
            ul.appendChild(li);
        });

        playlistDiv.appendChild(ul);
    }

    // Initialize with the first genre
    updateBackground(dropdown.value);
    updatePlaylist(dropdown.value);
});
