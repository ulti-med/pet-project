const name = document.querySelector("#character-name");
const image = document.querySelector("#character-image");
const button = document.querySelector("#fetch-character");
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
  try {
    const url = "https://rickandmortyapi.com/api/character";
    const response = await fetch(url);
    const data = await response.json();

    const firstPageCharacters = data.results.slice(0, 8);
    console.log(firstPageCharacters);
    const charactersContainer = document.querySelector(".characters-container");
    firstPageCharacters.map((character) => {
      const characterElement = document.createElement("div");
      characterElement.className = "character-card";
      characterElement.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        // <button class="add-favourite" data-id="${character.id}">Add to Favourites</button>
      `;
      charactersContainer.appendChild(characterElement);
    });
  } catch (error) {
    console.error("Failed to fetch characters:", error);
  }
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
