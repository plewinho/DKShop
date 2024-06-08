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
        li.addEventListener("click", getCategoryProducts.bind(cat));
        ul.appendChild(li);
      });
      nav.append(ul);
    })
    .catch((error) => console.log(error));
}

function getCategoryProducts() {
  const cat = this;
  const main = document.querySelector("main");
  setActiveCategory(cat);
  fetch(`http://localhost:8081/shop/backend/product.php?category=${cat}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.products) {
        main.innerHTML = "";
        populateCatalogue(data.products, main);
      }
    })
    .catch((error) => console.log(error));
}

function setActiveCategory(cat) {
  const categoryList = document.querySelectorAll(".navigation li");
  categoryList.forEach((category) => {
    if (category.classList.contains(cat)) {
      category.style.color = "white";
    } else category.style.color = "black";
  });
}
