let tasks = [];

save.addEventListener("click", () => {
  const modal = bootstrap.Modal.getInstance(
    document.querySelector("#exampleModal")
  );
  const title = document.querySelector("#title");
  const deadline = document.querySelector("#deadline");
  const category = document.querySelector("#category");

  const task = {
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

  document.querySelector("#tasks").innerHTML += createCard(task);

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  modal.hide();
});

window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task) => {
    document.querySelector("#tasks").innerHTML += createCard(task);
  });
});

function removeCard(botao) {
  botao.parentNode.parentNode.parentNode.remove();
}

function createCard(task) {
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
          <a href="#" onClick="removeCard(this)" class="btn btn-success"
            ><i class="bi bi-check-lg"></i
          ></a>
          <a href="#" onClick="removeCard(this)" class="btn btn-danger"><i class="bi bi-x-lg"></i></a>
        </div>
      </div>
    </div>
  `;
}
