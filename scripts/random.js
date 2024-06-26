const name = document.querySelector("#character-name");
const image = document.querySelector("#character-image");
const button = document.querySelector(".get-random");
const addFavouriteButton = document.querySelector(".add-to-favourite");
let id;

const getCharacter = async () => {
  id = Math.floor(Math.random() * 826) + 1;
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const data = await fetch(url);
  const parsedData = await data.json();
  name.textContent = parsedData.name;
  image.src = parsedData.image;
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

getCharacter();

button.onclick = getCharacter;
addFavouriteButton.onclick = addToFavourite;
