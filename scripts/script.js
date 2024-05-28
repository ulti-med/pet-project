const name = document.querySelector("#character-name");
const image = document.querySelector("#character-image");
const button = document.querySelector(".random-character-buttons");
const addFavouriteButton = document.querySelector("#add-favourite");
let id;

const getCharacter = async () => {
  id = Math.floor(Math.random() * 826) + 1;
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const data = await fetch(url);
  const parsedData = await data.json();
  name.textContent = parsedData.name;
  image.src = parsedData.image;
};

const getAllCharacters = async () => {
  const url = "https://rickandmortyapi.com/api/character";
  const response = await fetch(url);
  const data = await response.json();

  const firstPageCharacters = data.results.slice(0, 8);
  console.log(firstPageCharacters);
  firstPageCharacters.map((character) => {
    const htmlCard = `          
      <div class="card">
              <img id="character-image" src="${character.image}" alt="">
              <div class="card-info">
                  <div class="card-row">
                      <div id="character-id">${character.id}</div>. <span id="character-name">${character.name}</span>
                  </div>
                  <div class="card-row status-row">
                      <div id="status-circle" class="status-circle" data-status='${character.status}'></div> <span id="status-text">${character.status}</span>
                  </div>
                  <div class="card-row">
                      <div>Gender:</div> <span id="character-gender">${character.gender}</span>
                  </div>
                  <div class="card-row">
                      <div>Species:</div> <span id="character-species">${character.species}</span>
                  </div>
              </div>
          </div>
          `;
    container.insertAdjacentHTML("beforeend", htmlCard);
  });
};

const addToFavourite = async () => {
  const localCharacters = localStorage.getItem("characters");
  if (localCharacters) {
    const parsedCharacters = JSON.parse(localCharacters);
    if (parsedCharacters.includes(id)) {
      return;
    }
    localStorage.setItem(
      "characters",
      JSON.stringify([...parsedCharacters, id])
    );
  } else {
    localStorage.setItem("characters", JSON.stringify([id]));
  }
};

// getCharacter();
getAllCharacters();
button.onclick = getCharacter;
addFavouriteButton.onclick = addToFavourite;
