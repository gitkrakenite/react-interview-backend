const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const colors = require("colors");

// import routes
const userRoutes = require("./routes/uerRoute");
const newsRoutes = require("./routes/newsRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// // middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect to db
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("App runs");
});

app.use("/api/user", userRoutes); //user routes
app.use("/api/news", newsRoutes); //news routes

// // Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green));
