
let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function generateProductCards() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productName = document.createElement("h3");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price}`;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editProduct(index);
    });

  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteProduct(index);
    });

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDescription);
    productCard.appendChild(editButton);
    productCard.appendChild(deleteButton);

    productList.appendChild(productCard);
  });
}


function addProduct(name, price, description) {
  const newProduct = {
    name,
    price: parseFloat(price),
    description,
  };

  products.push(newProduct);
  saveProductsToLocalStorage();
  generateProductCards();
}

function editProduct(index) {
  const product = products[index];
  const name = prompt("Enter the new name:", product.name);
  const price = prompt("Enter the new price:", product.price);
  const description = prompt("Enter the new description:", product.description);

  if (name && price && description) {
    products[index] = {
      ...product,
      name,
      price: parseFloat(price),
      description,
    };
    saveProductsToLocalStorage();
    generateProductCards();
  }
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveProductsToLocalStorage();
  generateProductCards();
}

document.getElementById("product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const descriptionInput = document.getElementById("description");

  addProduct(nameInput.value, priceInput.value, descriptionInput.value);

  nameInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
});

generateProductCards();
