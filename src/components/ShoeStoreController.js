import ShoeStoreService from './ShoeStoreService.js';

const shoeStoreService = new ShoeStoreService();

function drawProducts(products) {
  document.getElementById('products').innerHTML = products
    .map(
      product => `
    <article class='product ${
      product.quantity <= 0 ? 'out-of-stock' : ''
    }' value='${product.id}'>
      <img class='product-image' src='${product.img}' alt='product image' />
      <span class='product-info'>
        <h3 class='product-name'>${product.name}</h3>
        <h3 class='product-price'>$${product.price}</h3>
      </span>
    </article>
  `
    )
    .join('');
  document.querySelectorAll('.product').forEach(product =>
    product.addEventListener('click', event => {
      shoeStoreService.addToCart(event.target.parentNode.getAttribute('value'));
      drawCheckout();
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
          <span class='cart-item-name'>
            ${item.name}
          </span>
          <span class='cart-item-quantity'>
            ${item.quantity}
          </span>
          <button class='remove-cart-item' value='${item.id}'>Remove</button>
        </li>
      ` // CSS handles "x" character before quantity
    )
    .join('');

  document.querySelectorAll('.remove-cart-item').forEach(button =>
    button.addEventListener('click', event => {
      shoeStoreService.removeFromCart(event.target.getAttribute('value'));
      drawCheckout();
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
    });
  }

  filter(value) {
    drawProducts(
      shoeStoreService.products.filter(
        product => product.name.indexOf(value) + 1
      )
    );
  }
}

export default ShoeStoreController;
