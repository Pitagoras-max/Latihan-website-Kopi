document.addEventListener("DOMContentLoaded", () => {
  const imageCards = document.querySelectorAll(".galeri .card");

  imageCards.forEach((card) => {
    const image = card.querySelector("img");

    if (!image) return;

    let productNameElement = null;

    card.addEventListener("mouseenter", () => {
      const productName = image.alt || "Deskripsi Tidak Tersedia";

      if (!productNameElement) {
        productNameElement = document.createElement("p");
        productNameElement.textContent = productName;

        productNameElement.classList.add("product-name-hover");

        card.appendChild(productNameElement);
      }

      card.classList.add("hover-active");
    });

    card.addEventListener("mouseleave", () => {
      if (productNameElement) {
        productNameElement.remove();
        productNameElement = null;
      }

      card.classList.remove("hover-active");
    });
  });
});
