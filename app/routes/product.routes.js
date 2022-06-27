module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.post("/addProduct", products.addProduct);

  router.get("/viewProducts", products.viewProducts);

  router.get("/product/:id", products.product);

  router.put("/update/:id", products.updateProduct);

  router.delete("/delete/:id", products.deleteProduct);

  app.use("/api/products", router);
};
