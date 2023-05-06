const fs = require("fs")

class ProductManager{
   #path
   constructor(path){
      this.products=[];
      this.#path = path;
      if(!fs.existsSync(this.#path))
      return fs.writeFileSync(this.#path, "[]")
   }

   getProducts(){
      this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
      console.log(this.products)
      return this.products
   }
   getProductById(id){
      this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))

      const productFound = this.products.find(p => p.id === id)
      if(productFound){
         return productFound 
      } else{
         console.log("Product not found")
         undefined 
      }
   }
   #getProductByCode(code){
      this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
      const existInArray = this.products.find (p => p.code === code)
      if(existInArray){
         return true; 
      }else{
         return false;
      }
   }

   #generateId(){ 
      this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
      let newId = 0;
      for (let i = 0; i < this.products.length; i++) {
         const prod = this.products[i];
         if(prod.id > newId){
            newId = prod.id
         }        
      } 
      return ++newId;
   }

   addProduct (title, description, price, thumbnail, stock, code ){
      
      this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))

      if(!title || !description || !price || !thumbnail || !stock || !code || this.#getProductByCode(code) ){
         return console.log("ERROR!, you can't left a field without complete or repeat the code, please try again");
      }else{
         let newProduct = {title, description, price, thumbnail, stock, code, id:this.#generateId()}
         this.products = [...this.products, newProduct]
         fs.writeFileSync(this.#path, JSON.stringify(this.products))
      }
   }

   deleteProduct(id){
      this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
      if(this.products.find (p => p.id === id)){
         this.products.splice (this.products.indexOf(this.products.find(p => p.id === id)), 1)
         fs.writeFileSync(this.#path, JSON.stringify(this.products))
         return console.log("Product deleted successfully")
      }else{
          return console.log("Product not found")
      }
   } 

   updateProduct(id, key, value){
      if(key == id){
         return console.log("You cannot change the id field")
      } else if(this.products.find (p => p.id === id)){
         const found = this.products.find (p => p.id === id)
         found [key] = value
         fs.writeFileSync(this.#path, JSON.stringify(this.products))
         return console.log("Updated product", found)
      } else{
         return console.log("Product not found ")
      }
   }
}

const product = new ProductManager("./products.json")

product.getProducts()
product.deleteProduct()
product.addProduct("camiseta de river", "camiseta de river 2023", 20000, "no image", 23, 220)




console.log(product)
