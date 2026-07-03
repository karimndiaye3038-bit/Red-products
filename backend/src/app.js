const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const hotelRoutes = require("./routes/hotel.routes");

const app = express();

app.use(cors());

// 🔥 IMPORTANT : pour lire JSON + form-data proprement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/hotels", hotelRoutes);

module.exports = app;