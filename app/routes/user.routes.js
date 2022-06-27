module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/registration", users.registration);

  router.post("/login", users.login);

  router.get("/list", users.retrieve);

  router.get("/:id", users.retrieveOne);

  router.put("/user/:id", users.update);

  router.delete("/user/:id", users.delete);

  // app.use('/api', router);
  app.use("/api/users", router);
};
