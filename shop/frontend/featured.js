function requestFeatured() {
  fetch("http://localhost:8081/shop/backend/featured.php", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const featured = data.featured;

      if (featured) {
        const featuredSection = document.querySelector(".featured-products");
        const catalogue = document.createElement("div");
        catalogue.className = "catalogue";
        featured.forEach((product) => {
          const card = document.createElement("div");
          card.className = "card";
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
        featuredSection.append(catalogue);
      }
    })
    .catch((error) => console.log("error"));
}
