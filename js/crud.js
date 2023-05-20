save.addEventListener("click", () => {
  const modal = bootstrap.Modal.getInstance(
    document.querySelector("#exampleModal")
  );
  const title = document.querySelector("#title");
  const deadline = document.querySelector("#deadline");
  const category = document.querySelector("#category");

  const task = {
    id: Date.now(),
    title: title.value,
    deadline: deadline.value,
    category: category.value,
    completed: false,
  };

  if (task.title.length == 0) {
    title.classList.add("is-invalid");
    return;
  }

  if (task.deadline.length == 0) {
    deadline.classList.add("is-invalid");
    return;
  }

  document.querySelector("#tasks").innerHTML += createTask(task);

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  modal.hide();
});

window.addEventListener("load", () => {
  tasks = getTasks();

  update();
});

document.querySelector("#search").addEventListener("keyup", () => {
  tasks = getTasks();
  const titleSearched = document.querySelector("#search").value;

  tasks = tasks.filter((task) => task.title.includes(titleSearched));

  update();
});

document.querySelector("#pending").addEventListener("click", () => {
  tasks = getTasks();
  tasks = tasks.filter((task) => !task.completed);

  update();
});

document.querySelector("#completed").addEventListener("click", () => {
  tasks = getTasks();
  tasks = tasks.filter((task) => task.completed);

  update();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

function update() {
  document.querySelector("#tasks").innerHTML = "";

  tasks.forEach((task) => {
    document.querySelector("#tasks").innerHTML += createTask(task);
  });
}

function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  update();
}

function completeTask(id) {
  tasks.find((task) => (task.id == id ? (task.completed = true) : undefined));

  saveTasks();
  update();
}

function createTask(task) {
  switch (task.category) {
    case "1":
      task.category = "Hardware";
      break;

    case "2":
      task.category = "Periferico";
      break;

    case "3":
      task.category = "Jogos";
      break;

    default:
      break;
  }
  const disabled = task.completed ? "disabled" : "";
  return `
    <div class="col-12 col-md-6 col-lg-3 mt-1">
      <div class="card text-center mb-3" style="width: 14rem">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p><span class="badge text-bg-${
            task.category == "Periferico"
              ? "info"
              : task.category == "Jogos"
              ? "danger"
              : "success"
          }">${task.category}</span></p>
          <p>${task.deadline} pts.</p>
          <a href="#" onClick="completeTask(${
            task.id
          })" class="btn btn-success ${disabled}"
            ><i class="bi bi-check-lg"></i
          ></a>
          <a href="#" onClick="removeTask(${
            task.id
          })" class="btn btn-danger"><i class="bi bi-x-lg"></i></a>
        </div>
      </div>
    </div>
  `;
}
