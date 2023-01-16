const getSongs = (url) => {
  fetch(url, {
    method: "GET",
  })
    .then((rawSongs) => rawSongs.json())
    .then((jsonSongs) => {
      showSongs(jsonSongs.data), countUnique(jsonSongs.data);
    })
    .catch((error) => console.error(error));
};

let pinkFloydContainer = document.getElementById("pink-floyd");
let daftPunkContainer = document.getElementById("daft-punk");
let metallicaContainer = document.getElementById("metallica");

const showSongs = (songDataArray) => {
  let container = null;
  for (song of songDataArray) {
    switch (song.artist.name) {
      case "Pink Floyd":
        container = pinkFloydContainer;
        break;

      case "Metallica":
        container = metallicaContainer;
        break;

      case "Daft Punk":
        container = daftPunkContainer;
        break;
    }

    container.innerHTML += `
        <div class="card mx-1 my-1 pt-2 col-2">
        <img src="${song.album.cover}" class="card-img-top w-100 rounded">
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
  for (songTitle of songTitlesArray) {
    let listItem = document.createElement("li");
    listItem.innerText = songTitle.innerText;
    songListOl.appendChild(listItem);
  }
};

window.onload = () => {
  getSongs(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=pinkfloyd"
  );

  getSongs(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=daftpunk"
  );

  getSongs(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica"
  );
};
