const dataPromise = fetch("http://localhost:8081/shop/backend/menu.php", {
  method: "GET",
})
  .then((res) => res.json())
  .catch((error) => console.log(error));

document.addEventListener("DOMContentLoaded", () => {
  dataPromise.then((data) => {
    const nav = document.querySelector(".navigation");
    if (data.categories) {
      const ul = document.createElement("ul");
      data.categories.forEach((cat) => {
        const li = document.createElement("li");
        li.className = cat;
        li.textContent = cat;
        li.addEventListener("click", getCategoryProducts);
        ul.appendChild(li);
      });
      nav.append(ul);
    }
  });
});

function getCategoryProducts() {
  console.log("huj");
}
