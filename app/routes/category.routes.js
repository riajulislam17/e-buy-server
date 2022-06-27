module.exports = (app) => {
  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();

  router.post("/addCategory", categories.addCategory);

  router.get("/viewCategory", categories.viewCategory);
  
  router.get("/category/:id", categories.category);

  router.put("/update/:id", categories.updateCategory);

  router.delete("/category/:id", categories.deleteCategory);

  app.use("/api/categories", router);
};
