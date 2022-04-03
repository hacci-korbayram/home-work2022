const userContainer = document.querySelector(".row");

let deleteButtons = [];
let editButtons = [];

const userCard = (id, imgSrc, name, phoneNumber) => {
  return `
    <div class="col-md-6">
        <div class="card" style="width: 18rem;">
            <img src="${imgSrc}" class="card-img-top" alt="${name}">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${phoneNumber}</p>
            <button type="button" class="btn btn-danger" id="delete__${id}">Delete</button>
            <button type="button" class="btn btn-warning" id="edit__${id}">Edit</button>
            </div>
        </div>
    </div>
`;
};
const getUser = (queryParams = "") => {
  fetch(`http://localhost:500/user?${queryParams}`)
    .then((res) => res.json())
    .then((user) => {
      userContainer.innerHTML = "";
      user.forEach((user) => {
        const { id, imgSrc, name, phoneNumber } = user;
        userContainer.innerHTML += userCard(
          id,
          imgSrc,
          phoneNumber,
          name
        );

        deleteButtons = document.querySelectorAll(".btn-danger");

        editButtons = document.querySelectorAll(".btn-warning");
      });

      Array.from(deleteButtons).forEach((button) => {
        button.addEventListener("click", (e) => {
          deleteUser(e.target.id.split("__")[1]);
        });
      });
      Array.from(editButtons).forEach((button) => {
        button.addEventListener("click", (e) => {
          editUser(e.target.id.split("__")[1]);
        });
      });
    });
};

getUser("pageSize=5");

document.querySelector("#get-all").addEventListener("click", () => {
  getUser();
});

document.querySelector("#sort-by-name").addEventListener("click", () => {
  getUser("sortBy=userName");
});

document.querySelector("#sort-by-phoneNumber").addEventListener("click", () => {
  getUser("sortBy=phoneNumber");
});

const deleteUser = (id) => {
  console.log("Delete:", id);
  fetch(`http://localhost:500/user/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const editUser = (id) => {
  console.log("Edit:", id);
  window.location.href = `../user-add/index.html?id=${id}`;
};