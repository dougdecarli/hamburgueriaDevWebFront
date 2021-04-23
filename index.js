let currentTotalValue = 0;
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
            let last = (productsResult.length - 1) == index
            console.log(product);

            const divProduct = document.createElement('div');
            divProduct.id = `product${index}`;
            divProducts.appendChild(divProduct);

            loadProductNameAndValue(product, index);
            loadProductDescription(product.description, index);
            createPlusButton(index, product.value);
            createMinusButton(index, product.value);

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

      const createPlusButton = (index, value) => {
        let divProduct = document.getElementById(`product${index}`);
        const button = document.createElement('button1');
        button.id = `plus_button${index}`;
        button.className = "buy-button-circle";
        button.textContent = "+";
        divProduct.appendChild(button);
        createPlusButtonListener(`plus_button${index}`, value);
      }

      const createMinusButton = (index, value) => {
        let divProduct = document.getElementById(`product${index}`);
        const button = document.createElement('button2');
        button.id = `minus_button${index}`
        button.className = "buy-button-circle";
        button.textContent = "-";
        divProduct.appendChild(button);
        createMinusButtonListener(`minus_button${index}`, value);
      }

      const createPlusButtonListener = (id, value) => {
        document.getElementById(id).addEventListener("click", (buttonClicked) => {
          let totalValue = document.getElementById(`total_value`);
          let total = currentTotalValue + value;
          currentTotalValue = total;
          totalValue.textContent = `Valor total: $${total.toFixed(2)}`;
        })
      }

      const createMinusButtonListener = (id, value) => {
        document.getElementById(id).addEventListener("click", (buttonClicked) => {
          let totalValue = document.getElementById(`total_value`);
          let total = currentTotalValue - value;
          currentTotalValue = total;
          totalValue.textContent = `Valor total: $${total.toFixed(2)}`;
        })
      }