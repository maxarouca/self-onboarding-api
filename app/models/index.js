const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.identification = require("./identification.model.js")(mongoose);
db.addressRegistration = require("./address-registration.model.js")(mongoose);
db.companyData = require("./company-data.model.js")(mongoose);
db.personalData = require("./personal-data.model.js")(mongoose);
db.bankData = require("./bank-data.model.js")(mongoose);
db.representatives = require("./representatives.model.js")(mongoose);
db.beneficiares = require("./beneficiares.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);

module.exports = db;
