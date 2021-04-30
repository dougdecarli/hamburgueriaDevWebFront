let currentTotalValue = 0;
const selectedProducts = [];
let divProducts = document.getElementById('products');
let getProductsRequest = new XMLHttpRequest(),
  method = "GET",
  url = "http://localhost:3333/products";
getProductsRequest.open(method, url, true);
getProductsRequest.onreadystatechange = () => {
  if (getProductsRequest.readyState === XMLHttpRequest.DONE && getProductsRequest.status === 200) {
    let productsResult = JSON.parse(getProductsRequest.response);
    console.log(productsResult);
    for (let index = 0; index < productsResult.length; index++) {
      const product = productsResult[index];
      let last = (productsResult.length - 1) == index;

      const divProduct = document.createElement('div');
      divProduct.id = `product${index}`;
      divProducts.appendChild(divProduct);

      loadProductNameAndValue(product, index);
      loadProductDescription(product.description, index);
      createPlusButton(index, product);
      createMinusButton(index, product);

      if (!last) {
        divProducts.appendChild(document.createElement('hr'));
      }
    }
  }
}
getProductsRequest.send();

const loadProductNameAndValue = (product, index) => {
  let divProduct = document.getElementById(`product${index}`);
  const h1 = document.createElement('h1');
  h1.innerHTML = `<b>${product.name}</b><span class="w3-right w3-tag w3-dark-grey w3-round">R$${product.value}</span>`;
  divProduct.appendChild(h1);
}

const loadProductSelectedNameAndValue = (product, index) => {
  let divProduct = document.getElementById(`product-selected${index}`);
  const h3 = document.createElement('h1');
  h3.innerHTML = `<b>${product.name}</b><span class="w3-right w3-tag w3-dark-grey w3-round">R$${product.value}</span>`;
  divProduct.appendChild(h3);
}

const loadTotal = (total) => {
  let totalValueOrder = document.getElementById(`total_value_order`);
  totalValueOrder.textContent = `Valor total: $${total.toFixed(2)}`;
}

const loadProductDescription = (description, index) => {
  let divProduct = document.getElementById(`product${index}`);
  const p = document.createElement('p');
  p.className = "w3-text-grey description";
  p.textContent = description;
  divProduct.appendChild(p);
}

const createPlusButton = (index, product) => {
  let divProduct = document.getElementById(`product${index}`);
  const button = document.createElement('button1');
  button.id = `plus_button${index}`;
  button.className = "buy-button-circle";
  button.textContent = "+";
  divProduct.appendChild(button);
  createPlusButtonListener(index, product);
}

const createMinusButton = (index, product) => {
  let divProduct = document.getElementById(`product${index}`);
  const button = document.createElement('button2');
  button.id = `minus_button${index}`
  button.className = "buy-button-circle-disabled";
  button.textContent = "-";
  divProduct.appendChild(button);
  createMinusButtonListener(index, product);
}

const createPlusButtonListener = (index, product) => {
  document.getElementById(`plus_button${index}`).addEventListener("click", () => {
    let totalValue = document.getElementById(`total_value`);
    let total = currentTotalValue + product.value;
    currentTotalValue = total;
    totalValue.textContent = `Valor total: $${total.toFixed(2)}`;
    appendProduct(product);
    changeMinusButtonState(index, product);
  })
}

const createMinusButtonListener = (index, product) => {
  document.getElementById(`minus_button${index}`).addEventListener("click", () => {
    let totalValue = document.getElementById(`total_value`);
    let total = currentTotalValue - product.value;
    currentTotalValue = total;
    totalValue.textContent = `Valor total: $${total.toFixed(2)}`;
    removeProduct(product);
    changeMinusButtonState(index, product);
  })
}

const changeMinusButtonState = (index, product) => {
  console.log(selectedProducts);
  let button = document.getElementById(`minus_button${index}`);
  if (selectedProducts.includes(product)) {
    button.className = "buy-button-circle";
  } else {
    button.className = "buy-button-circle-disabled";
  }
}

const appendProduct = (product) => {
  selectedProducts.push(product);
}

const removeProduct = (product) => {
  for (let index = 0; index < selectedProducts.length; index++) {
    if (selectedProducts[index] == product) {
      selectedProducts.splice(index, 1);
      return;
    }
  }
}

document.getElementById("finish_order").addEventListener("click", () => {
  console.log(selectedProducts);
  if (selectedProducts.length > 0) {
    document.querySelector(".popup").style.display = "flex";
  }
  let divProductsSelected = document.getElementById('products_selected');
  while (divProductsSelected.firstChild) {
    divProductsSelected.removeChild(divProductsSelected.firstChild);
  }
  loadTotal(currentTotalValue);
  for (let index = 0; index < selectedProducts.length; index++) {
    const productSelected = selectedProducts[index];
    const divProductSelected = document.createElement('div');
    divProductSelected.id = `product-selected${index}`;
    divProductsSelected.appendChild(divProductSelected);
    loadProductSelectedNameAndValue(productSelected, index);
    orderPostListener();
  }
})

const orderPostListener = () => {
  document.getElementById("post_order").addEventListener("click", () => {
    let name = document.getElementById("input_name").textContent;
    let address = document.getElementById("input_address").textContent;
    let tel = document.getElementById("input_tel").textContent;
    console.log(name, address, currentTotalValue, tel);
    postOrder(name, address, currentTotalValue, tel);
  })
}

const postOrder = (name, address, total, tel) => {
  const url = "http://localhost:3333/orders";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ "clientName": name, "total": total, "cellphone": tel, "address": address }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(
    response => response.json()
  ).then(
    showConfirmationPopup
  ).catch(
    error => console.log(error)
  )
}

const showConfirmationPopup = () => {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".confirmation-popup").style.display = "flex";
}



