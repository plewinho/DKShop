function requestBanner() {
  fetch("http://localhost:8081/shop/backend/banner.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.banners) {
        const banners = data.banners;
        banners.forEach((banner) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.style.backgroundImage = `url('http://localhost:8081${banner.image}')`;
          slide.style.height = "45vh";
          slide.style.backgroundSize = "cover";
          const h3 = document.createElement("h3");
          h3.textContent = banner.name;
          const p = document.createElement("p");
          p.textContent = banner.description;
          const button = document.createElement("button");
          button.textContent = "Shop now";
          slide.append(h3, p, button);
          const swiperWrapper = document.querySelector(".swiper-wrapper");
          swiperWrapper.append(slide);
        });
        callCarousel();
      }
    })
    .catch((error) => console.log("error"));
}

function callCarousel() {
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
