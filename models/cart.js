const fs = require("fs");
const path = require("path");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch old card
    fs.readFile(
      path.join(path.dirname(process.mainModule.filename), "data", "cart.json"),
      (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!err) {
          cart = JSON.parse(fileContent);
        } else {
          console.log(err);
        }
        // Analyze the cart => Find existing product

        const existingProductIndex = cart.products.findIndex(
          (prod) => prod.id === id
        );
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;

        // Add new product / increase quantity
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(
          path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "cart.json"
          ),
          JSON.stringify(cart),
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }
  static deleteProduct(id, productId) {
    fs.readFile( path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "cart.json"
    ), (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.findIndex((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.product.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice = cart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile( path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "cart.json"
    ), (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
