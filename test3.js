const ProductManager = require("./test2.js")
const express = require("express");
const morgan = require ("morgan")
const app = express();
const port = 3000;
const product = new ProductManager("./products.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use (morgan ('dev'));
app.get("/products", async (req, res) => {
  try {
    const allProducts = await product.getProducts();
    const consulta = req.query;
    const setLimit = Object.keys(consulta).lenght;
    if (setLimit == 0) {
      res.status(200).send({ status: "success", data: allProducts });
    }else{
      res.status(200).send({ status: "success", data: allProducts.slice(0, setLimit) });

    }
  } catch (error) {
    res.status(401).send(error);
  }
});

app.get("/products/:pId", async (req,res) =>{
    try{
        const {pId} = req.params
        const productId = await product.getProductById(pId)

        if(!productId){
            res.status(404).send({status:"Not found", data: "Product not found" })
        } else{
            res.status(200).send ({status:"success", data: productId}) 
        }

    } catch(error){
        res.status(401).send(error)
    }
})

app.listen(port, () => console.log(`server in port: ${port}`));
