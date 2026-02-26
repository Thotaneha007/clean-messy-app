const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= CREATE ================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      priority,
      completed
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const activity = new Activity({
      userId: req.user.id,
      title,
      description,
      category,
      difficulty,
      priority,
      completed
    });

    await activity.save();

    res.json({ success: true, activity });

  } catch (error) {
    console.log("CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= READ ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json({ success: true, activities });

  } catch (error) {
    console.log("READ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      priority,
      completed
    } = req.body;

    const updated = await Activity.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        title,
        description,
        category,
        difficulty,
        priority,
        completed
      },
      { new: true }
    );

    res.json({ success: true, updated });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Activity.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ success: true });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;