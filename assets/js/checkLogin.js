const LoggedIn = document.querySelectorAll(".logged-in");
const LoggedOut = document.querySelectorAll(".logged-out");
const mainContainer = document.querySelector("#main-container");
const saludo = document.querySelector("#saludo");
export const checkLogin = (user) => {
  if (user) {
    LoggedIn.forEach((element) => (element.style.display = "block"));
    LoggedOut.forEach((element) => (element.style.display = "none"));
    //mostramos el main container
    mainContainer.style.display = "block";
    saludo.textContent = `Bienvenid@ ${user.email}`;
  } else {
    LoggedOut.forEach((element) => (element.style.display = "block"));
    LoggedIn.forEach((element) => (element.style.display = "none"));

    //ocultamos el main container
    mainContainer.style.display = "none";
    saludos.textContent = "";
  }
};
