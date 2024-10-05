import { createTask, onGetTask } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");
export const setupTasks = () => {
  //CREATE
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    try {
      await createTask(title, description);
      showMessage("tarea creada", "success");
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

      tasksHtml += `
                  <div id="tasks-container" class="mt-3">
            <article class="task-container border border-2 rounded-2 p-3">
              <h4>${data.title}</h4>
              <hr />
              <p>${data.description}</p>
            </article>
          </div>
          `;
    });
    tasksContainer.innerHTML = tasksHtml;
  });
};
