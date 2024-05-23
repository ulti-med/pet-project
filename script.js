"use strict";
let firstButton = document.querySelector("#first");
let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let lastButton = document.querySelector("#last");
let totalCharacters = document.querySelector("#total-characters");
let container = document.querySelector("#container");

const apiUrl = "https://rickandmortyapi.com/api/character";
let pages;
let nextPageUrl;
let prevPageUrl;
let currentPage;

const renderCards = async (url) => {
  container.innerHTML = "";
  const data = await fetch(url);
  const parsedData = await data.json();
  totalCharacters.textContent = parsedData.info.count;

  pages = parsedData.info.pages;
  nextPageUrl = parsedData.info.next;
  prevPageUrl = parsedData.info.prev;
  if (url === apiUrl) {
    currentPage = Number(1);
  } else {
    currentPage = Number(url.split("page=")[1]);
  }

  if (currentPage === 1) {
    firstButton.disabled = true;
    prevButton.disabled = true;
    lastButton.disabled = false;
    nextButton.disabled = false;
  } else if (currentPage === pages) {
    lastButton.disabled = true;
    nextButton.disabled = true;
    firstButton.disabled = false;
    prevButton.disabled = false;
  } else {
    firstButton.disabled = false;
    prevButton.disabled = false;
    lastButton.disabled = false;
    nextButton.disabled = false;
  }

  parsedData.results.forEach((character) => {
    const htmlCard = `          
    <div id="character-card">
    <img src=${character.image} alt="" id="character-image" />
    <h1 id="character-name">${character.name}</h1>
    <div class="random-character-buttons">
      <button class="get-random" id="fetch-character">
        Delete
      </button>
    </div>
  </div>
                `;
    container.insertAdjacentHTML("beforeend", htmlCard);
  });
};

renderCards(apiUrl);

firstButton.onclick = () =>
  renderCards("https://rickandmortyapi.com/api/character?page=1");
prevButton.onclick = () => renderCards(prevPageUrl);
nextButton.onclick = () => renderCards(nextPageUrl);
lastButton.onclick = () =>
  renderCards(`https://rickandmortyapi.com/api/character?page=${pages}`);
