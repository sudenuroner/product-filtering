import products from "./products";

// Ürünlerin orjinal kopyasını değişkene atama
let filteredProducts = [...products];

// ürünlerin görüneceği yer
const productsContainer = document.querySelector(".products-container");

// ürünleri görüntülemek için fonksiyon
const displayProducts = () => {
  // eğer filtrelenmiş ürün sayısı 1 den azsa hata göster ve çık
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML`<h6> Aramaya uygun sonuç yok</h6>`;
    return;
  }

  // filtrelenmiş ürünleri html olarak ürünler bölümüne ekle
  productsContainer.innerHTML = filteredProducts.map((product) => {
    const { id, name, description, price, image, stock, rating, brand, tags } = product;
    return `
        <article class="product" data-id="${id}">
          <img 
            src="${image}"
            class="product-img img"
            alt=""
          />

          <footer>
            <h5 class="product-name">${name}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>
        `;
  })
    .join("");
};

displayProducts();


// arama formunu ve giriş alanını seç
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

// arama girişi ve her tuşa basıldığında tetiklenen olay
form.addEventListener("keyup", () => {
  //arama girişindeki değeri al
  const inputValue = searchInput.value;

  //ürünleri başlık içinde arama yaparak filtrele
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue.toLowerCase());
  });
  // filtrelenmiş ürünleri göster
  displayProducts();
});

// şirket elemanlarının ekleneceği yer
const categoryDOM = document.querySelector(".category");

// şirketleri ekleyecek fonksiyon
const displayButtons = () => {
  const buttons = [
    "hepsi", ...new Set(products.map((product) => product.category)),
  ];

  // şirket elemanlarını benzersiz bir şekilde ekle
  categoryDOM.innerHTML = buttons
    .map((category) => {
      return `<button class="category-btn" data-id="${category}">${category}</button>`;
    })
    .join("");
};

displayButtons();

// şirket butonlarına tıklama olayı
categoryDOM.addEventListener("click", (e) => {
  const el = e.target;
  // eğer şirket ile ilgili bir butona tıklandıysa
  if (el.classList.category("company-btn")) {
    // hepsi butonuna tıklanırsa
    if (el.dataset.id == "hepsi") {
      filteredProducts = [...products];
    } else {
      // diğer butonlara tıklanırsa
      filteredProducts = products.filter((product) => {
        return product.category === el.dataset.id;
      });
    }
    // arama girişini temizle ve filtrelenmiş ürünleri görüntüle
    searchInput.value = "";
    displayProducts();
  }
});