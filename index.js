import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortText } from "./utils/stringFunc.js";
let allProducts = null;
let category = "all";
let search = "";
const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.getElementById("searchBtn");
const inputBox = document.getElementById("searchInput");
const listItems = document.querySelectorAll("li");

const renderProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
    <div>
    <img alt=${product.title} src=${product.image}>
    <h4> ${shortText(product.title)}</h4>
    <div id=price>
    <p>$ ${product.price}</P>
      <button>
      Buy <i class="fa-solid fa-cart-shopping"></i></button>
    </div>
    <div id="rate">
    <i class="fa-solid fa-star"></i>
    <span>Rate${product.rating.rate}</span>
    </div>
     <div id="count">
     <i class="fa-solid fa-user"></i>
    <span>${product.rating.count}</span>
    </div>
    </div>
    `;
    mainContent.innerHTML += jsx;
  });
};
const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }
  allProducts = await getData("products");
  renderProducts(allProducts);
};
const filterProducts = () => {
  const searchText = inputBox.value.trim().toLowerCase();
  let filteredProducts;

  if (searchText) {
    if (category === "all") {
      filteredProducts = allProducts.filter((product) => {
        const title = shortText(product.title).toLowerCase();

        if (searchText.length > 2) {
          const regex = new RegExp(`\\b${searchText}\\b`, "i");
          return regex.test(title);
        }

        return title.includes(searchText);
      });
    } else {
      filteredProducts = allProducts.filter((product) => {
        const title = shortText(product.title).toLowerCase();
        const prodCategory = (product.category || "").toLowerCase();

        if (searchText.length > 2) {
          const regex = new RegExp(`\\b${searchText}\\b`, "i");
          return regex.test(title) && prodCategory === category;
        }

        return title.includes(searchText) && prodCategory === category;
      });
    }
  } else {
    if (category === "all") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter(
        (product) => (product.category || "").toLowerCase() === category
      );
    }
  }

  renderProducts(filteredProducts);
};

const searchHandler = () => {
  search = inputBox.value.trim().toLowerCase();
  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();
  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.classList = "selected";
    } else {
      li.classList = "";
    }
  });
  filterProducts();
};
document.addEventListener("DOMContentLoaded", init);

searchButton.addEventListener("click", searchHandler);


inputBox.addEventListener("input", filterProducts);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
