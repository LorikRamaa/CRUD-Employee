let students = [];
let form = document.getElementById("form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let positionInput = document.getElementById("position");
let cityInput = document.getElementById("city");
let filter = document.getElementById("filter");
let tableContainer = document.querySelector("#table_container");

function displayItems() {
  let itemFromStorage = getFromStorage();
  itemFromStorage.forEach((item) => {
    createStudents(item.name, item.email, item.position, item.city);
  });
}
function renderStudent() {
  tableContainer.innerHTML = "";

  let table = document.createElement("table");
  let tableHead = document.createElement("thead");
  let tableBody = document.createElement("tbody");

  let headRow = document.createElement("tr");
  headRow.innerHTML = `
      <th>Full Name</th>
      <th>Email</th>
      <th>Position</th>
      <th>City</th>
      <th>Actions</th>
  `;

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${student.$name}</td>
    <td>${student.$email}</td>
    <td>${student.$position}</td>
    <td>${student.$city}</td>
    <td>
        <button id="editBtn" onclick="editStudent(${student.id})">Edit</button>
        <button id="deleteBtn" onclick="deleteStudent(${student.id})">Delete</button>
    </td>
    `;
    tableBody.appendChild(row);
  });

  tableHead.appendChild(headRow);
  table.appendChild(tableBody);
  table.appendChild(tableHead);
  tableContainer.appendChild(table);
}

function addUser(e) {
  e.preventDefault();
  createStudents();
  addUserToLocalStorage();
}
function createStudents(name, email, position, city) {
  let $name = nameInput.value;
  let $email = emailInput.value;
  let $position = positionInput.value;
  let $city = cityInput.value;

  let studentObj = {
    id: students.length + 1,
    $name,
    $email,
    $position,
    $city,
  };
  students.push(studentObj);
  renderStudent();
  nameInput.value = "";
  emailInput.value = "";
  positionInput.value = "";
  cityInput.value = "";
}

function editStudent(studentId) {
  const student = students.find((student) => student.id === studentId);
  if (student) {
    const newName = prompt("edit your name", student.$fullname);
    const newEmail = prompt("edit your email", student.$email);
    const newPosition = prompt("edit your school", student.$position);
    const newCity = prompt("edit your city", student.$city);
    student.$fullname = newName;
    student.$email = newEmail;
    student.$position = newPosition;
    student.$city = newCity;
    renderStudent();
  }
}
function deleteStudent(studentId) {
  const student = students.findIndex((student) => student.id === studentId);
  if (student !== -1) {
    if (confirm("are you sure to delete user")) {
      students.splice(student, 1);
      removeFromStorage();
    }
    renderStudent();
  }
}
function filterEmployee(user) {
  let inputValue = user.target.value.toLowerCase();

  let listUser = document.querySelectorAll("tr");
  listUser.forEach((user) => {
    const userName = user.textContent.toLowerCase();
    console.log(userName);
    if (userName.indexOf(inputValue) != -1) {
      user.style.display = "table-row";
    } else {
      user.style.display = "none";
    }
  });
}

function addUserToLocalStorage() {
  let itemToStorage;
  if (localStorage.getItem("users") === null) {
    itemToStorage = [];
  } else {
    itemToStorage = JSON.parse(localStorage.getItem("users"));
  }

  let $name = nameInput.value;
  let $email = emailInput.value;
  let $position = positionInput.value;
  let $city = cityInput.value;
  let studentObj = {
    id: students.length + 1,
    name: $name,
    email: $email,
    position: $position,
    city: $city,
  };
  itemToStorage.push(studentObj);
  localStorage.setItem("users", JSON.stringify(itemToStorage));
}

function getFromStorage() {
  let itemToStorage;
  if (localStorage.getItem("users") === null) {
    itemToStorage = [];
  } else {
    itemToStorage = JSON.parse(localStorage.getItem(itemToStorage));
  }

  return itemToStorage;
}

function removeFromStorage(user) {
  let itemToStorage;
  if (localStorage.getItem("users") === null) {
    itemToStorage = [];
  } else {
    itemToStorage = JSON.parse(localStorage.getItem("users"));
  }
  // const userIndex = user.children[0].innerText;
  console.log(user);
  // itemToStorage.splice(itemToStorage.indexOf(userIndex, 1));
  // localStorage.setItem("users", JSON.stringify(itemToStorage));
}
filter.addEventListener("input", filterEmployee);
form.addEventListener("submit", addUser);
document.addEventListener("DOMContentLoaded", displayItems);
renderStudent();
