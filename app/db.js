const mongoose = require("mongoose");
const dbConfig = require("./config/db.config.js");

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(dbConfig.url, connectionParams);
    console.log("Connected to the database!");
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }
};
