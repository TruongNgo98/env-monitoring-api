const Station = require("../models/station.model");

//getUser middleware
exports.getStation =  async function(req, res, next) {
    let station;
    try {
      station = await Station.findById(req.params.id);
      if (station == null) {
        return res.status(404).json({ message: "Cannot find User" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.station = station;
    next();
  }