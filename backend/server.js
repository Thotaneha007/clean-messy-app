const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");
const activityRoutes = require("./routes/activity");

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/activity", activityRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Autism Learning Portal Backend Running");
});

/* ================= DATABASE CONNECTION ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    /* ================= START SERVER AFTER DB CONNECTS ================= */
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });