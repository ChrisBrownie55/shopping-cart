import ShoeStoreController from './src/components/ShoeStoreController.js';

class App {
  constructor() {
    this.controllers = {
      shoeStore: new ShoeStoreController()
    };
  }
}
const app = new App();

document
  .getElementById('search')
  .addEventListener('input', event =>
    app.controllers.shoeStore.filterProducts(event.target.value)
  );

const cart = document.getElementById('cart');
document.getElementById('toggle-cart').addEventListener('click', event => {
  if (!event.target.checked) {
    const height = getComputedStyle(cart).height;
    cart.style.bottom = `calc(-${height} + 1rem)`;
  } else {
    cart.style.bottom = '';
  }
});
