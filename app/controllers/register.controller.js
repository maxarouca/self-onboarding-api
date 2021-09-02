const db = require("../models");
const Identification = db.identification;
const Addressregistration = db.addressRegistration;
const Companydata = db.companyData;
const Personaldata = db.personalData;
const Bankdata = db.bankData;

const steps = {
  identification: Identification,
  "address-registration": Addressregistration,
  "company-data": Companydata,
  "personal-data": Personaldata,
  "bank-data": Bankdata,
};

// Create and Save a new Identification Step
exports.create = (req, res) => {
  const id = req.decoded.id;

  // Validate request
  if (!req.body) {
    res.status(400).send({ message: `Content can not be empty ${req.step}!` });
    return;
  }

  console.log(req.body);

  const stepData = new steps[req.step]({
    ...req.body,
    userId: id,
  });

  // Save Step in the database
  stepData
    .save(stepData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the data.",
      });
    });
};

// Retrieve all Step identification from the database.
exports.findAll = (req, res) => {
  steps[req.step]
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// Find a single Step identification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  steps[req.step]
    .find({ userId: id })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found data with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving data with id=" + id });
    });
};

// Update a Step identification by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  steps[req.step]
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`,
        });
      } else res.send({ message: "Step was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating data with id=" + id,
      });
    });
};

exports.findAllSteps = async (req, res) => {
  const id = req.decoded.id;

  const identification = await Identification.findOne({ userId: id });
  const addressRegistration = await Addressregistration.findOne({ userId: id });
  const companyData = await Companydata.findOne({ userId: id });
  const personalData = await Personaldata.findOne({ userId: id });
  const bankData = await Bankdata.findOne({ userId: id });
  // const representatives = await Identification.findOne({ userId: id })

  res.send({
    identification,
    addressRegistration,
    companyData,
    personalData,
    bankData,
    // representatives,
  });
};

// Retrieve all Step identification from the database.
exports.findAll = (req, res) => {
  const id = req.decoded.id;

  steps[req.step]
    .find({ userId: id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// // Delete a Step identification with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };
