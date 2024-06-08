document.addEventListener("DOMContentLoaded", requestCategories);
document.addEventListener("DOMContentLoaded", requestBanner);
document.addEventListener("DOMContentLoaded", requestFeatured);
document.addEventListener("DOMContentLoaded", checkLoginStatus);

function populateCatalogue(products, main) {
  const catalogue = document.createElement("div");
  catalogue.className = "catalogue";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", getProductsDetails.bind(product));
    const imgDiv = document.createElement("div");
    imgDiv.className = "card-img";
    const descDiv = document.createElement("div");
    descDiv.className = "card-descrition";
    card.append(imgDiv, descDiv);
    const img = document.createElement("img");
    img.src = `http://localhost:8081${product.image}`;
    imgDiv.appendChild(img);
    const nameP = document.createElement("p");
    nameP.className = "product-name";
    nameP.textContent = product.name;
    const priceP = document.createElement("p");
    priceP.className = "product-price";
    priceP.textContent = `${product.price}zł`;
    descDiv.append(nameP, priceP);
    catalogue.appendChild(card);
  });
  main.appendChild(catalogue);
}
function displayOverlay(modal) {
  const main = document.querySelector("main");

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.addEventListener("click", removeOverlay);
  main.appendChild(overlay);
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.appendChild(modal);
  main.appendChild(modalContainer);
}

function getProductsDetails() {
  const id = this.id;
  // const main = document.querySelector("main");
  fetch(`http://localhost:8081/shop/backend/inventory.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const stock = +data.stock;
      // const overlay = document.createElement("div");
      // overlay.className = "overlay";
      // overlay.addEventListener("click", removeOverlay);
      // main.appendChild(overlay);
      // const modalContainer = document.createElement("div");
      // modalContainer.className = "modal-container";
      const modal = document.createElement("div");
      modal.className = "modal";
      // modalContainer.appendChild(modal);
      // main.appendChild(modalContainer);
      const img = document.createElement("img");
      img.src = `http://localhost:8081${this.image}`;
      modal.appendChild(img);
      const modalDesc = document.createElement("div");
      modalDesc.className = "modal-desc";
      modal.appendChild(modalDesc);
      const title = document.createElement("div");
      title.textContent = this.name;
      modalDesc.appendChild(title);
      const desc = document.createElement("div");
      desc.textContent = this.description;
      modalDesc.appendChild(desc);
      const price = document.createElement("div");
      price.textContent = `${this.price}zł`;
      modalDesc.appendChild(price);
      const stockDiv = document.createElement("div");
      switch (true) {
        case stock > 10:
          stockDiv.textContent = "Duża ilość na stanie";
          stockDiv.style.color = "green";
          break;
        case stock > 0 && stock <= 10:
          stockDiv.textContent = `Ostatnie ${stock} sztuki`;
          stockDiv.style.color = "orange";
          break;
        case stock === 0:
          stockDiv.textContent = "Produkt niedostępny";
          stockDiv.style.color = "red";
          break;
        default:
          stockDiv.textContent = "Produkt niedostępny";
          stockDiv.style.color = "red";
          break;
      }
      modalDesc.appendChild(stockDiv);
      const select = document.createElement("select");
      if (stock == 0) {
        select.disabled = true;
      } else {
        const counter = stock > 10 ? 10 : stock;
        for (let i = 1; i <= counter; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          select.appendChild(option);
        }
      }
      modalDesc.appendChild(select);
      const addToCart = document.createElement("button");
      addToCart.classList = "add-to-cart";
      addToCart.textContent = "Dodaj do koszyka";
      modalDesc.appendChild(addToCart);
      displayOverlay(modal);
    })
    .catch((error) => console.log(error));
}

function removeOverlay() {
  //const main = document.querySelector("main");
  const overlay = document.querySelector(".overlay");
  const modalContainer = document.querySelector(".modal-container");
  if (overlay) {
    overlay.remove();
  }
  if (modalContainer) {
    modalContainer.remove();
  }
}
