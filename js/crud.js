save.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const points = document.querySelector("#points").value;
  const category = document.querySelector("#category").value;

  const task = {
    title,
    description,
    points,
    category,
  };

  document.querySelector("#tasks").innerHTML += createCard(task);
});

function createCard(task) {
  switch (task.category) {
    case "1":
      task.category = "Estudo";
      break;

    case "2":
      task.category = "Trabalho";
      break;

    case "3":
      task.category = "Casa";
      break;

    default:
      break;
  }
  return `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card text-center mb-3" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <p class="card-text">${task.description}</p>
          <p><span class="badge text-bg-${
            task.category == "Trabalho"
              ? "info"
              : task.category == "Casa"
              ? "danger"
              : "success"
          }">${task.category}</span></p>
          <p>${task.points} pts.</p>
          <a href="#" class="btn btn-success"
            ><i class="bi bi-check-lg"></i
          ></a>
          <a href="#" class="btn btn-danger"><i class="bi bi-x-lg"></i></a>
        </div>
      </div>
    </div>
  `;
}
