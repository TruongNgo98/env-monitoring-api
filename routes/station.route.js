const express = require("express");
const router = express.Router();
const Station = require("../models/station.model");
const {getStation} = require('../middlewares/station.get.middleware');

// Get All Route
router.get("/", async (req, res) => {
    try {
        const station = await Station.find()
        res.json(station)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
// Get One Route
router.get("/:id", getStation, (req, res) => {
    res.json(res.station);
});
// // Create One Route
router.post("/", async (req, res) => {
    const station = new Station({
        "name": req.body.name,
        "channel": req.body.channel,
        "description": req.body.description
    });
    try {
        const newStation = await station.save();
        res.status(201).json({ newStation });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Edit One Route PUT version
// router.put("/:id", getStation, async (req, res) => {
//     try {
//         const updatedStation = await res.station.set(req.body);
//         res.json(updatedStation);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
// Edit One Route PATCH version
router.put("/:id", getStation, async (req, res) => {
    if (req.body.name != null) {
        res.station.name = req.body.name;
    }
    if (req.body.channel != null) {
        res.station.channel = req.body.channel;
    }
    if (req.body.description != null) {
        res.station.description = req.body.description;
    }
    try {
        const updatedStation = await res.station.save();
        res.json(updatedStation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete One Route
router.delete("/:id", getStation, async (req, res) => {
    try {
        await res.station.deleteOne();
        res.json({ message: "User has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;