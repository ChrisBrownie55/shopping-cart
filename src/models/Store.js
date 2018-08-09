const removeTrailingDecimalPlaces = float => parseFloat(float.toFixed(2));

class Store {
  constructor(items = [], cash = 0) {
    this.items = items;
    this.cash = cash;
    this.cart = [];
  }

  get products() {
    return JSON.parse(JSON.stringify(this.items));
  }

  get cartItems() {
    return JSON.parse(JSON.stringify(this.cart));
  }

  get subtotal() {
    return removeTrailingDecimalPlaces(
      this.cart.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      )
    );
  }

  get taxes() {
    return removeTrailingDecimalPlaces(
      this.cart.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity * 0.06,
        0
      )
    );
  }

  get total() {
    return removeTrailingDecimalPlaces(this.subtotal + this.taxes);
  }

  addToCart(itemID) {
    const item = this.items.find(item => item.id === itemID);
    if (item && item.quantity) {
      let cartItem = this.cart.find(cartItem => cartItem.id === itemID);
      if (!cartItem) {
        cartItem = {
          id: item.id,
          name: item.name,
          img: item.img,
          price: item.price,
          quantity: 0
        };
        this.cart.push(cartItem);
      }
      if (cartItem.quantity < item.quantity) {
        ++cartItem.quantity;
      }
    }
  }

  removeFromCart(itemID) {
    const index = this.cart.findIndex(item => item.id === itemID);
    if (index === -1) return;

    this.cart.splice(index, 1);
  }

  purchaseItem(itemID, quantity) {
    const item = this.items.find(item => item.id === itemID);
    if (item) {
      item.quantity -= quantity;
    }
  }

  purchaseItemsInCart() {
    this.cash += this.total;
    this.cart.forEach(cartItem =>
      this.purchaseItem(cartItem.id, cartItem.quantity)
    );
    this.cart.splice(0);
  }
}

export default Store;
