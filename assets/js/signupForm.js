import { auth, updateProfile } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("formulario enviado");
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const displayName = signupForm["signup-name"].value;
  //Manejo de errores
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName,
    });

    showMessage("Usuario registrado", "success");

    // Cerrar el modal
    const signupModal = document.querySelector("#signup-modal");
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();
    //Limpiar el formulario
    signupForm.reset();
  } catch (error) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      showMessage("El correo ya esta en uso", "error");
    }
    if (error.code === "auth/invalid-email") {
      showMessage("el correo es invalido", "error");
    }
    if (error.code === "auth/weak-password") {
      showMessage("La contraseña debe contener minimo 6 caracters", "error");
    } else {
      showMessage(error.code, "error");
    }
  }
});
