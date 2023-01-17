const getSongs = (queryKey) => {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + queryKey,
    {
      method: "GET",
    }
  )
    .then((rawSongs) => rawSongs.json())
    .then((jsonSongs) => {
      showSongs(jsonSongs.data), countUnique(jsonSongs.data);
    })
    .catch((error) => console.error(error));
};

const showSongs = (songDataArray) => {
  let container = null;
  for (song of songDataArray) {
    switch (song.artist.name) {
      case "Pink Floyd":
        container = document.getElementById("pink-floyd");
        break;

      case "Metallica":
        container = document.getElementById("daft-punk");
        break;

      case "Daft Punk":
        container = document.getElementById("metallica");
        break;
    }

    container.innerHTML += `
        <div class="card my-1 pt-2 col-3">
        <img src="${song.album.cover_big}" class="card-img-top w-100 rounded">
          <div class="card-body">
            <h5 class="card-title">${song.title_short}</h5>
            <a href="${song.artist.link}" class="card-subtitle text-muted" target="blank_">${song.artist.name}</a>
          </div>
        </div>`;
  }
};

let uniqueCount = 0;
const countUnique = (songDataArray) => {
  let albumIDArray = [];
  for (song of songDataArray) {
    if (!albumIDArray.includes(song.album.id)) {
      albumIDArray.push(song.album.id);
    }
  }
  return (uniqueCount += albumIDArray.length);
};

const showUniqueCount = () => {
  let countSpan = document.querySelector("#countUniqueModalBody span");
  countSpan.innerText = uniqueCount;
  console.log("The number of unique albums in the page is: ", uniqueCount);
};

const createSongList = () => {
  let songListOl = document.querySelector("#songListModalBody ol");
  songListOl.innerHTML = "";
  let songTitlesArray = document.querySelectorAll(
    ".card .card-body .card-title"
  );
  let i = 1;
  for (songTitle of songTitlesArray) {
    let listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerText = i + "- " + songTitle.innerText;
    songListOl.appendChild(listItem);
    i++;
  }
};

window.onload = () => {
  let artists = ["PinkFloyd", "DaftPunk", "Metallica"];
  for (artist of artists) getSongs(artist);
};
