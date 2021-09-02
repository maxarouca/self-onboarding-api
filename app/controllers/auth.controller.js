const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

// Create and Save a new Identification Step
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty user!" });
    return;
  }
  if (!req.body.acceptTerms) {
    res.status(400).send({ message: "It is necessary to accept the terms!" });
    return;
  }

  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;

      if (user) {
        res.json({
          success: false,
          message: "E-mail already registered",
        });
      }

      // Create a User
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        merchantType: req.body.merchantType,
        acceptTerms: req.body.acceptTerms,
      });

      // Save Identification Step in the database
      newUser
        .save(newUser)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while saving the data.",
          });
        });
    }
  );
};

exports.login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;

      const formattedUser = {
        name: user.name,
        email: user.email,
        country: user.country,
        merchantType: user.merchantType,
        id: user._id,
      };

      if (!user) {
        res.json({
          success: false,
          message: "User not found",
        });
      }
      if (user.password !== req.body.password) {
        res.json({
          success: false,
          message: "Incorrect password",
        });
      } else {
        const token = jwt.sign(formattedUser, "self2021", {
          expiresIn: "1440m",
        });

        res.json({
          formattedUser,
          token: token,
        });
      }
    }
  );
};
