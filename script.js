const newAvengers = [];

const select = document.getElementById("universe");

//Eventos
document.getElementById("search").addEventListener("click", async () => {
  cleanAlerts();
  cleanCharacter();
  addCharacter();
  resetInput();
  cleanUniverse();
});

document.getElementById("clear-history").addEventListener("click", () => {
  clearHistoy();
});

document.getElementById("show-history").addEventListener("click", () => {
  clearHistoy();
  displayCharacterHistory();
});

//Funcion de mensaje
function showAlert(message) {
  document.getElementById("alert").innerHTML = "";
  const Alert = document.getElementById("alert");
  const element = document.createElement("div");
  element.innerHTML = `
      <h2>${message}</h2>
  `;
  Alert.appendChild(element);
}

//Funciones manipulan a los eventos y a componentes del DOM
function resetInput() {
  document.getElementById("character").value = "";
}

function clearHistoy() {
  document.getElementById("history-container").innerHTML = "";
}

function cleanUniverse() {
  document.getElementById("universe-container").innerHTML = "";
}

function cleanCharacter() {
  document.getElementById("character-container").innerHTML = "";
}

function cleanAlerts() {
  document.getElementById("alert").innerHTML = "";
}

//Funcion que
async function addCharacter() {
  const characterName = document.getElementById("character").value;
  if (!characterName) {
    showAlert("Favor de ingresar un nombre de un personaje");
    return;
  }
  const character = await searchCharacters(characterName);
  console.log("oadao" + character);
  if (!character || !character?.data?.results?.[0]?.id) return;
  displayCharacter(character);
  selectUniverse(character);
}

//Función fetch
async function searchCharacters(characterName) {
  try {
    const KEY = "ecaefda9e411f8f3f161f30be7a17df6";
    const HASH = "b2547d237696e7f1b7fc87cd1ae69e1d";
    const urlName = characterName ? `&nameStartsWith=${characterName}` : "";
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${KEY}&hash=${HASH}${urlName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data?.data?.total == 0) {
      showAlert("No se ha encontrado su personaje");
      return;
    }

    return data;
  } catch (err) {
    showAlert("Conexión fallida con la base de datos");
    console.log(err);
  }
}

//Función que muestra a los personajes
function displayCharacter(character) {
  newAvengers.push(character);
  const charactersList = document.getElementById("character-container");

  const characters = character.data.results;

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.innerHTML = `
                <div class="characterMarvel">
                    <h2>${character.name}</h2>
                  <div class="portada-marvel">
                    <img class="imgTa" src="${character.thumbnail.path}.${
      character.thumbnail.extension
    }">
                  </div>
                    <p class="characterDescription">${
                      character.description || "No hay descripción"
                    }</p>
                </div>
                `;
    charactersList.appendChild(characterElement);
    newAvengers.sort((a, b) => {
      return a.data.results[0].id - b.data.results[0].id;
    });
  });
}

//Funcion que muestra el historial
function displayCharacterHistory() {
  const CharacterHistoryContainer =
    document.getElementById("history-container");
  newAvengers.innerHTML = "";
  newAvengers.forEach((character) => {
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="history-character">
                <div class="col">
                  <strong>Name: ${character.data.results[0].name}</strong> 
                  <img class="img-history" src="${character.data.results[0].thumbnail.path}.jpg" width="150px" height="150px">
                </div>
            </div>          
    `;
    CharacterHistoryContainer.appendChild(element);
  });
}

function selectUniverse(character) {
  const characterList = document.getElementById("universe-container");
  const universe = document.getElementById("universe").value;
  const element = document.createElement("div");
  element.classList.add("list-group");
  const selectedCharacter = character.data.results[0];
  if (!selectedCharacter) {
    showAlert("No se ha encontrado su personaje");
    return;
  }
  const selectedUniverse = selectedCharacter[universe].items;
  selectedUniverse.forEach((items) => {
    element.innerHTML += `
      <div class="universe-container-list">
      <li class="universe-list">${universe}: ${items.name}</li>
      <div> 
        `;
  });
  characterList.appendChild(element);
}
