import Product from '../models/Product.js';
import Store from '../models/Store.js';

const store = new Store([
  new Product(
    'B&W Shoes',
    'https://cdn.shopify.com/s/files/1/2262/5459/files/Atoms-shoes_2000x.progressive_113858b6-ec01-42bc-9ffc-9249e1318bf6_1900x.progressive.jpg?v=1527300179',
    20.99,
    35
  ),
  new Product(
    'Black Shoes',
    'https://cdn.shopify.com/s/files/1/2262/5459/files/Atoms-all-black-shoes.jpg?11256974081508786995',
    15.25,
    5
  ),
  new Product(
    'White Shoes',
    'https://pbs.twimg.com/media/DddQjlUU8AAh19q.jpg',
    34.99,
    2
  ),
  new Product(
    'OLLO Black Red GUM',
    'https://ollofr.com/wp-content/uploads/2017/12/BLACK-RED-GUM-OLLO-12-14-17-1610.jpg',
    5,
    8
  )
]);

class ShoeStoreService {
  get products() {
    return store.products;
  }

  get cartItems() {
    return store.cartItems;
  }

  get subtotal() {
    return store.subtotal;
  }

  get taxes() {
    return store.taxes;
  }

  get total() {
    return store.total;
  }

  addToCart(itemID) {
    store.addToCart(itemID);
  }

  removeFromCart(itemID) {
    store.removeFromCart(itemID);
  }

  purchaseItemsInCart() {
    store.purchaseItemsInCart();
  }
}

export default ShoeStoreService;
