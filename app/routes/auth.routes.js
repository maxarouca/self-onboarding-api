module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  const router = require("express").Router();

  // Create a new User
  router.post("/sign-in", auth.createUser);

  // Authenticate in api
  router.post("/login", auth.login);

  // // Retrieve a single Step identification with id
  // router.get("/identification/:id", register.findOne);

  // // Update a Step identification with id
  // router.put("/identification/:id", register.update);

  // // Delete a Step identification with id
  // router.delete("/:id", tutorials.delete);

  app.use("/api/auth", router);
};
