require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const usersRouter = require("./routes/users.route");
const stationRouter = require("./routes/station.route");


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/stations", stationRouter);


app.listen(PORT, () => { console.log("Server started on http://localhost:" + PORT) })