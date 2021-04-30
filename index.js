      let currentTotalValue = 0;
      const selectedProducts = [];
      let divProducts = document.getElementById('products');
      let request = new XMLHttpRequest(),
        method = "GET",
        url = "http://localhost:3333/products";
      request.open(method, url, true);
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          let productsResult = JSON.parse(request.response);
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
      request.send();

      const loadProductNameAndValue = (product, index) => {
        let divProduct = document.getElementById(`product${index}`);
        const h1 = document.createElement('h1');
        h1.innerHTML = `<b>${product.name}</b><span class="w3-right w3-tag w3-dark-grey w3-round">R$${product.value}</span>`;
        divProduct.appendChild(h1);
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