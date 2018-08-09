import ShoeStoreService from './ShoeStoreService.js';

const shoeStoreService = new ShoeStoreService();

function drawProducts(products) {
  document.getElementById('products').innerHTML = products
    .map(
      product => `
    <article class='product ${
      product.quantity <= 0 ? 'out-of-stock' : ''
    }' id='${product.id}'>
      <div class='product-image-wrapper'>
        <img class='product-image' src='${product.img}' alt='product image' />
        <button class='product-button' value='${
          product.id
        }'>Add to cart</button>
      </div>
      <span class='product-info'>
        <h3 class='product-name'>${product.name}</h3>
        <h3 class='product-price'>$${product.price}</h3>
      </span>
    </article>
  `
    )
    .join('');
  document.querySelectorAll('.product-button').forEach(product =>
    product.addEventListener('click', event => {
      const id = event.target.getAttribute('value');
      const remainingQuantity = shoeStoreService.addToCart(id);
      drawCheckout();
      if (!remainingQuantity) {
        event.target.parentNode.parentNode.classList.add('out-of-stock');
      }
    })
  );
}

function drawCheckout() {
  const cartItems = shoeStoreService.cartItems;
  const cartElement = document.getElementById('cart');
  if (!cartItems || !cartItems.length) {
    cartElement.classList.add('empty');
    return;
  }

  document.getElementById('cart-items').innerHTML = cartItems
    .map(
      item => `
        <li class='cart-item'>
          <span>
            <span class='cart-item-name'>
              ${item.name}
            </span>
            <span class='cart-item-quantity'>
              ${item.quantity}
            </span>
          </span>
          <button class='remove-cart-item' value='${item.id}'>Remove</button>
        </li>
      ` // CSS handles "x" character before quantity
    )
    .join('');

  document.querySelectorAll('.remove-cart-item').forEach(button =>
    button.addEventListener('click', event => {
      const id = event.target.getAttribute('value');
      shoeStoreService.removeFromCart(id);
      drawCheckout();
      document.getElementById(id).classList.remove('out-of-stock');
    })
  );

  document.getElementById('subtotal').textContent = shoeStoreService.subtotal;
  document.getElementById('tax').textContent = shoeStoreService.taxes;
  document.getElementById('total').textContent = shoeStoreService.total;
  cartElement.classList.remove('empty');
}

class ShoeStoreController {
  constructor() {
    drawProducts(shoeStoreService.products);
    document.getElementById('purchase').addEventListener('click', () => {
      shoeStoreService.purchaseItemsInCart();
      drawCheckout();
      const successDialog = document.getElementById('purchase-successful');
      successDialog.showModal();
      setTimeout(() => successDialog.close(), 1500);
    });
  }

  filterProducts(value) {
    value = value.toLocaleLowerCase();
    drawProducts(
      shoeStoreService.products.filter(
        product => product.name.toLocaleLowerCase().indexOf(value) + 1
      )
    );
  }
}

export default ShoeStoreController;
