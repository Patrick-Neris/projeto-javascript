save.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const idProduct = document.querySelector("#idProduct").value;
  const deadline = document.querySelector("#deadline").value;
  const category = document.querySelector("#category").value;

  const task = {
    title,
    idProduct,
    deadline,
    category,
  };

  document.querySelector("#tasks").innerHTML += createCard(task);
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
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card text-center mb-3" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.idProduct}</p>
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
