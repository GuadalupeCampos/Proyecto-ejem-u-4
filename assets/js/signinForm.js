import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signinForm = document.querySelector("#signin-form");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("formulario enviado");
  const email = signinForm["signin-email"].value;
  const password = signinForm["signin-password"].value;

  //Manejo de errores
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    showMessage("Usuario registrado", "success");

    // Cerrar el modal
    const signinModal = document.querySelector("#signin-modal");
    const modal = bootstrap.Modal.getInstance(signinModal);
    modal.hide();
    //Limpiar el formulario
    signinForm.reset();
  } catch (error) {
    console.log(error);

    if (error.code === "auth/invalid-credential") {
      showMessage("Contraseña incorrecta", "error");
    }
    if (error.code === "auth/invalid-email") {
      showMessage("el correo es invalido", "error");
    } else {
      showMessage(error.code, "error");
    }
  }
});
