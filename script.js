function random() {
    const arrayID = [1011334, 1011175, 1011198, 1011031, 1011297];
    let seleccionado = Math.floor(Math.random() * arrayID.length);
    let rvalue = arrayID[seleccionado];
    return rvalue;
  }
  
  document.getElementById("generateUser").addEventListener("click", async () => {
    const datos = await getUser();
    random();
    addCharacterUI(datos);
  });
  
  async function getUser() {
    const HASH = "b2547d237696e7f1b7fc87cd1ae69e1d";
    const KEY = "ecaefda9e411f8f3f161f30be7a17df6";
    const API = `https://gateway.marvel.com:443/v1/public/characters/${random()}?ts=1&apikey=`;
    try {
      const data = await fetch(`${API}${KEY}&hash=${HASH}`);
      return await data.json();
    } catch (err) {
      console.log("error: ", err);
    }
  }
  
  async function Impresion() {
    const datos = await getUser();
    console.log(datos);
  }
  
  function addCharacterUI(user) {
    const userList = document.getElementById("character-container");
    const element = document.createElement("div");
    element.innerHTML = `
      <strong>ID: </strong> ${user.data.results[0].id}
      <strong>Name: </strong> ${user.data.results[0].name}
      <img src="${user.data.results[0].thumbnail.path}.jpg" width="150px" height="150px">
    `;
    userList.appendChild(element);
  }
  
  Impresion();
