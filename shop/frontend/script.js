// const dataPromise = fetch("http://localhost:8081/shop/backend/menu.php", {
//   method: "GET",
// })
//   .then((res) => res.json())
//   .catch((error) => console.log(error));

// document.addEventListener("DOMContentLoaded", () => {
//   dataPromise.then((data) => {
//     const nav = document.querySelector(".navigation");
//     if (data.categories) {
//       const ul = document.createElement("ul");
//       data.categories.forEach((cat) => {
//         const li = document.createElement("li");
//         li.className = cat;
//         li.textContent = cat;
//         li.addEventListener("click", getCategoryProducts);
//         ul.appendChild(li);
//       });
//       nav.append(ul);
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", requestCategories);
document.addEventListener("DOMContentLoaded", requestBanner);

function requestCategories() {
  fetch("http://localhost:8081/shop/backend/menu.php")
    .then((response) => response.json())
    .then((data) => {
      const nav = document.querySelector(".navigation");
      const ul = document.createElement("ul");
      data.categories.forEach((cat) => {
        const li = document.createElement("li");
        li.className = cat;
        li.textContent = cat;
        li.addEventListener("click", getCategoryProducts);
        ul.appendChild(li);
      });
      nav.append(ul);
    })
    .catch((error) => console.log(error));
}

function requestBanner() {
  fetch("http://localhost:8081/shop/backend/banner.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("ewq");
    })
    .catch((error) => console.log("error"));
}

function getCategoryProducts() {
  console.log("huj");
}
