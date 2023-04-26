class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    console.log(this.products);
    return this.products;
  }
  getProductById(id) {
    const foundProduct = this.products.find((p) => p.id == id);
    if (foundProduct) {
      return foundProduct;
    } else {
      console.log("Error: There's not product with that id, please try again");
      return undefined;
    }
  }
  #getProductByCode(code) {
    const existInArray = this.products.find((p) => p.code == code);
    if (existInArray) {
      return true;
    } else {
      return false;
    }
  }
  #genId() {
    let newId = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (product.id > newId) {
        newId = product.id;
      }
    }
    return ++newId;
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    if (
      title == undefined ||
      title == "" ||
      description == undefined ||
      description == "" ||
      price == NaN ||
      price == "" ||
      thumbnail == undefined ||
      thumbnail == "" ||
      stock == NaN ||
      stock == "" ||
      code == null ||
      code == "" ||
      this.#getProductByCode(code)
    ) {
      return console.log("ERROR!, you can't left a field without complete or repeat the code, please try again");
    } else {
      let newProduct = {
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        id: this.#genId(),
      };
      this.products = [...this.products, newProduct];
    }
  }
}

const finalProduct = new ProductManager();

finalProduct.addProduct(
  "producto de prueba",
  "este es un producto prueba",
  200,
  "no image",
  23,
  "123abc"
);


finalProduct.getProductById(1);

console.log(finalProduct);
