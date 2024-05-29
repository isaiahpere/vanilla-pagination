document.addEventListener("DOMContentLoaded", function () {
  let appContainer = document.getElementById("app");
  let products = [];
  let page = 1;

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();

      if (data && data.products) {
        products = data.products;
        render();
        console.log(products);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const render = () => {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");

    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("products__single");
        productElement.innerHTML = `
            <img src=${product.thumbnail} alt=${product.title}/>
            <span>${product.title}</span>
          `;
        productsContainer.appendChild(productElement);
      });

      if (page > 1) {
        const prevButton = createPaginationButton("◀️", () => {
          selectPageHandler(page - 1);
        });
        pagination.appendChild(prevButton);
      }

      // display number buttons
      for (let i = 0; i < products.length / 10; i++) {
        const pageButton = createPaginationButton(
          i + 1,
          () => {
            selectPageHandler(i + 1);
          },
          page === i + 1
        );
        pagination.appendChild(pageButton);
      }

      if (page < products.length / 10) {
        const nextButton = createPaginationButton("▶️", () => {
          selectPageHandler(page + 1);
        });
        pagination.appendChild(nextButton);
      }
    }
    appContainer.innerHTML = "";
    appContainer.appendChild(productsContainer);
    appContainer.appendChild(pagination);
  };

  const createPaginationButton = (text, clickHandler, isSelected = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    if (isSelected) {
      button.classList.add("pagination_selected");
    }
    return button;
  };
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      page = selectedPage;
      render();
    }
  };

  fetchProducts();
});
