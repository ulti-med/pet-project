"use strict";

let container = document.querySelector("#container");

const createCard = (character) => {
  let characterContainer = document.createElement("div");
  characterContainer.dataset.characterId = character.id;
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.dataset.characterId = character.id;
  deleteButton.onclick = removeFromFavourite;

  let characterImg = document.createElement("img");
  characterImg.src = character.image;

  let characterName = document.createElement("h1");
  characterName.textContent = character.name;

  characterContainer.appendChild(characterImg);
  characterContainer.appendChild(characterName);
  characterContainer.appendChild(deleteButton);

  characterContainer.classList.add("character-container");
  container.appendChild(characterContainer);
};

const getCharacter = async () => {
  const characters = JSON.parse(localStorage.getItem("characters"));
  if (characters && characters.length !== 0) {
    characters.forEach(async (characterId) => {
      const url = `https://rickandmortyapi.com/api/character/${characterId}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      createCard(parsedData);
    });
  }
};

const removeFromFavourite = (event) => {
  const id = Number(event.target.dataset.characterId);
  const localCharacters = localStorage.getItem("characters");

  if (localCharacters) {
    const parsedCharacters = JSON.parse(localCharacters);
    if (parsedCharacters.includes(id)) {
      const filteredCharacters = parsedCharacters.filter(
        (characterId) => characterId !== id
      );
      localStorage.setItem("characters", JSON.stringify(filteredCharacters));
      const characterContainers = document.querySelectorAll(
        ".character-container"
      );
      if (characterContainers && characterContainers.length !== 0) {
        characterContainers.forEach((characterContainer) => {
          if (characterContainer.dataset.characterId == id) {
            characterContainer.remove();
          }
        });
      }
    }
  }
};

getCharacter();
