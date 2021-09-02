module.exports = (app) => {
  const register = require("../controllers/register.controller.js");
  const upload = require("../middlewares/upload.middleware.js");

  const router = require("express").Router();
  const auth = require("../middlewares/auth.middleware");

  router.use(auth.authMiddlware);
  // Retrive all data in all steps on register
  router.get("/", register.findAllSteps);

  // Create a new Step
  router.post("/identification", register.create);
  router.post("/address-registration", register.create);
  router.post("/company-data", register.create);
  router.post("/personal-data", register.create);
  router.post("/representatives", register.create);
  router.post("/bank-data", register.create);
  router.post("/beneficiares", register.create);

  // Retrieve all Steps identification
  router.get("/identification", register.findById);
  router.get("/address-registration", register.findById);
  router.get("/company-data", register.findById);
  router.get("/personal-data", register.findById);
  router.get("/representatives", register.findById);
  router.get("/bank-data", register.findById);
  router.get("/beneficiares", register.findById);

  // Retrieve a single Step identification with id
  router.get("/identification/:id", register.findOne);
  router.get("/address-registration/:id", register.findOne);
  router.get("/company-data/:id", register.findOne);
  router.get("/personal-data/:id", register.findOne);
  router.get("/representatives/:id", register.findOne);
  router.get("/bank-data/:id", register.findOne);
  router.get("/beneficiares/:id", register.findOne);

  // Update a Step identification with id
  router.put("/identification/:id", register.update);
  router.put("/address-registration/:id", register.update);
  router.put("/company-data/:id", register.update);
  router.put("/personal-data/:id", register.update);
  router.put("/representatives/:id", register.update);
  router.put("/bank-data/:id", register.update);
  router.put("/beneficiares/:id", register.update);

  // // Delete a Step identification with id
  // router.delete("/:id", tutorials.delete);

  router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `${req.serverUrl}/file/${req.file.filename}`;
    return res.send(imgUrl);
  });

  app.use("/api/register", router);
};
