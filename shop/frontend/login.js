const login = document.querySelector(".login");
const register = document.querySelector(".register");
const logout = document.querySelector(".logout");
const loggedUser = document.querySelector(".logged-user");

login.addEventListener("click", userLogin);
logout.addEventListener("click", userLogout);
function userLogin(e) {
  e.preventDefault();
  const formDiv = document.createElement("div");
  formDiv.className = "formDiv";
  const h2 = document.createElement("h2");
  h2.textContent = "Zaloguj się";
  formDiv.appendChild(h2);
  const loginForm = document.createElement("form");
  loginForm.className = "login-form";
  const userName = document.createElement("input");
  userName.type = "text";
  userName.name = "username";
  userName.placeholder = "Username";

  const password = document.createElement("input");
  password.type = "password";
  password.name = "password";
  password.placeholder = "Password";

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "Login";
  submit.className = "login-btn";
  submit.addEventListener("click", userLoginRequest);
  loginForm.append(userName, password, submit);
  formDiv.appendChild(loginForm);
  displayOverlay(formDiv);
}

function userLoginRequest(e) {
  e.preventDefault();
  const form = document.querySelector(".login-form");
  const formData = new FormData(form);
  fetch("http://localhost:8081/shop/backend/login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      data.user && displayLoggedUser(data.user);
    })
    .catch((error) => console.log(error));
}

function showHideIcon(icon, flag) {
  flag ? (icon.style.display = "none") : (icon.style.display = "block");
}

function displayLoggedUser(user) {
  removeOverlay();
  const loggedUserSpan = document.querySelector(".username");
  loggedUserSpan.textContent = user;
  showHideIcon(login, true);
  showHideIcon(register, true);
  showHideIcon(logout, false);
  showHideIcon(loggedUser, false);
}

function displayLoginRehisterIcons() {
  showHideIcon(login, false);
  showHideIcon(register, false);
  showHideIcon(logout, true);
  showHideIcon(loggedUser, true);
}

function checkLoginStatus() {
  fetch("http://localhost:8081/shop/backend/login.php?q=check_status")
    .then((response) => response.json())
    .then((data) => {
      data.user != "gość" && displayLoggedUser(data.user);
      data.user == "gość" && displayLoginRehisterIcons();
    })
    .catch((error) => console.log(error));
}

function userLogout() {
  fetch("http://localhost:8081/shop/backend/login.php")
    .then((response) => response.json())
    .then((data) => {
      data.logout && displayLoginRehisterIcons();
    })
    .catch((error) => console.log(error));
}
