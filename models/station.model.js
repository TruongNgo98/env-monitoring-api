const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
const Station = mongoose.model("Station", stationSchema);
module.exports = Station;