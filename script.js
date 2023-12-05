const newAvengers = [];

const select = document.getElementById("universe");

//Eventos
document.getElementById("search").addEventListener("click", async () => {
  displaycharacter();
  resetInput();
});

document.getElementById("new-team").addEventListener("click", () => {
  disableElements(false);
  cleanTeam();
});

document.getElementById("clear-history").addEventListener("click", () => {
  clearHistoy();
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

function cleanTeam() {
  document.getElementById("character-container").innerHTML = "";
  document.getElementById("alert").innerHTML = "";
  document.getElementById("new-team").disabled = true;
}

function clearHistoy() {
  document.getElementById("history-container").innerHTML = "";
}

document.getElementById("show-history").addEventListener("click", () => {
  displayCharacterHistory();
});

function disableElements(status) {
  document.getElementById("character").disabled = status;
  document.getElementById("search").disabled = status;
}

//Funcion que
async function displaycharacter() {
  const characterName = document.getElementById("character").value;
  if (!characterName) {
    showAlert("Favor de ingresar un nombre de un personaje");
    return;
  }
  const character = await searchCharacters(characterName);
  addCharacter(character);
  selectUniverse2(character);
}

//Función fetch
async function searchCharacters(characterName) {
  try {
    const KEY = "ecaefda9e411f8f3f161f30be7a17df6";
    const HASH = "b2547d237696e7f1b7fc87cd1ae69e1d";
    const urlName = characterName ? `&nameStartsWith=${characterName}` : "";
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${KEY}&hash=${HASH}${urlName}`;

    const data = await fetch(`${apiUrl}`);
    //console.log(data);

    if (data.status === 404) {
      showAlert("No se ha encontrado su personaje");
      return;
    }
    return await data.json();
  } catch (err) {
    showAlert("Conexión fallida con la base de datos");
  }
}

function busqueda() {
  const characterName = document.getElementById("characterName").value;
  searchCharacters(characterName);
}

function btnAllPersonajes() {
  searchCharacters("");
}

//Función que muestra a los personajes
function addCharacter(character) {
  newAvengers.push(character);
  const charactersList = document.getElementById("character-container");
  charactersList.innerHTML = "";

  const characters = character.data.results;

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.innerHTML = `
                <div class="characMarvel">
                    <h2>${character.name}</h2>
                  <div class="portada-marvel">
                    <img class="imgTa" src="${character.thumbnail.path}.${
      character.thumbnail.extension
    }">
                  </div>
                    <p class="characDescription">${
                      character.description || "No hay descripción"
                    }</p>
                </div>
                `;
    charactersList.appendChild(characterElement);

    //if (characterElement.childElementCount >= 5) {
    //document.getElementById("new-team").disabled = false;
    //disableElements(true);
    //showAlert("!El equipo de los nuevos vengadores esta completo!");
    //}
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
                  <strong>Name: </strong> ${character.data.results[0].name}
                  <img class="img-history" src="${character.data.results[0].thumbnail.path}.jpg" width="150px" height="150px">
                </div>
            </div>          
    `;
    CharacterHistoryContainer.appendChild(element);
  });
}

//Funcion que muestra las apariciones
function selectUniverse(character) {
  const characterList = document.getElementById("character-container");
  const element = document.createElement("div");
  if (select.value == "comics") {
    element.innerHTML = `
      <strong>Comics: </strong> ${character.data.results[0].comics.items[0].name}
      `;
  } else if (select.value == "events") {
    element.innerHTML = `
      <strong>Events: </strong> ${character.data.results[0].events.items[0].name}
      `;
  } else if (select.value == "series") {
    element.innerHTML = `
      <strong>Series: </strong> ${character.data.results[0].series.items[0].name}
      `;
  } else if (select.value == "stories") {
    element.innerHTML = `
      <strong>Stories: </strong> ${character.data.results[0].stories.items[0].name}
      `;
  }
  characterList.appendChild(element);
}
