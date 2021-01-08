const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
// Get All Route
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
// Get One Route
router.get("/:id", (req, res) => {
    res.json(res.user);
});
// Create One Route
router.post("/", async (req, res) => {
    const user = new User({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
    try {
        const newUser = await user.save();
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Edit One Route PUT version
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await res.user.set(req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Edit One Route PATCH version
router.patch("/:id", async (req, res) => {
    if (req.body.firstname != null) {
        res.user.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
        res.user.lastname = req.body.lastname;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete One Route
router.delete("/:id", async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "User has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;