import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");

// Variable de edición
let editStatus = false;
let editId = "";

export const setupTasks = (user) => {
  //CREATE
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    try {
      if (!editStatus) {
        await createTask(
          title,
          description,
          user.displayName,
          user.photoURL,
          user.email
        );
        showMessage("tarea creada", "success");
      } else {
        await updateTask(editId, { title, description });
        showMessage("tarea actualizada", "success");

        editStatus = false;
        editId = "";

        document.getElementById("form-title").innerHTML = "Añadir una tarea";
        taskForm["btn-agregar"].value = "Crear Tarea";
      }
      taskForm.reset();
    } catch (error) {
      showMessage(error.code, "error");
    }
  });

  // READ

  onGetTask((querySnapshot) => {
    let tasksHtml = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let formattedCreationTime = "";
      if (data.userFecha) {
        formattedCreationTime = data.userFecha;
      }

      tasksHtml += `
      <article class="task-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <img class="task-profile-picture rounded-circle" src="${
              data.userImage
                ? data.userImage
                : "./assets/img/defaultProfile.png"
            }" alt="${data.userName}" />
            <p class="m-0">${data.userName}</p>
 <p>Publicado el: ${data.userFecha}</p>
          </div>
          ${
            user.email === data.userEmail
              ? `<div>
            <button class="btn btn-info btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i> Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i> Eliminar</button>
          </div>`
              : `<div></div>`
          }
        </header>
        <hr /> 
        <h4>${data.title}</h4>
        <p>${data.description}</p>
      </article>
      `;
    });
    tasksContainer.innerHTML = tasksHtml;

    // Update
    const btnsEditar = document.querySelectorAll(".btn-editar");

    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id);

        const task = doc.data();

        taskForm["title"].value = task.title;
        taskForm["description"].value = task.description;

        editStatus = true;
        editId = doc.id;

        document.getElementById("form-title").innerHTML = "Editar tarea";
        taskForm["btn-agregar"].value = "Guardar cambios";
      });
    });
    // Delete
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteraamos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        showMessage("Tarea eliminada", "success");
      });
    });
  });
};
