const mongoose = require("mongoose");
const Country = mongoose.model(
  "Country",
  new mongoose.Schema({
    name: String,
    region: String,
  })
);
module.exports = Country;