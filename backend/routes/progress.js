const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= HELPER: BADGE LOGIC ================= */
function getBadge(accuracy) {
  if (accuracy === 100) return "🏆 Perfect";
  if (accuracy >= 90) return "🥇 Gold";
  if (accuracy >= 75) return "🥈 Silver";
  if (accuracy >= 60) return "🥉 Bronze";
  return "⭐ Beginner";
}

/* ================= HELPER: STREAK LOGIC ================= */
function updateStreak(user) {
  const today = new Date();
  const lastPlayed = user.streak.lastPlayedDate;

  if (!lastPlayed) {
    user.streak.currentStreak = 1;
  } else {
    const diffTime = today - new Date(lastPlayed);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.streak.currentStreak += 1;
    } else if (diffDays > 1) {
      user.streak.currentStreak = 1;
    }
  }

  if (user.streak.currentStreak > user.streak.longestStreak) {
    user.streak.longestStreak = user.streak.currentStreak;
  }

  user.streak.lastPlayedDate = today;
}

/* ================= SAVE CLEAN & MESSY SESSION ================= */
router.post("/clean-messy", authMiddleware, async (req, res) => {
  try {
    const { correct, wrong, totalQuestions } = req.body;

    if (!totalQuestions || totalQuestions === 0) {
      return res.status(400).json({ message: "Invalid totalQuestions" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accuracy = Math.round((correct / totalQuestions) * 100);

    /* ===== Update Totals ===== */
    user.cleanMessy.totalAttempts += 1;
    user.cleanMessy.totalCorrect += correct;
    user.cleanMessy.totalWrong += wrong;

    /* ===== Best Accuracy ===== */
    if (accuracy > user.cleanMessy.bestAccuracy) {
      user.cleanMessy.bestAccuracy = accuracy;
    }

    /* ===== Improvement Calculation ===== */
    const previousAccuracy = user.cleanMessy.lastAccuracy || 0;
    user.cleanMessy.improvement = accuracy - previousAccuracy;
    user.cleanMessy.lastAccuracy = accuracy;

    /* ===== Badge Assignment ===== */
    user.cleanMessy.badge = getBadge(accuracy);

    /* ===== Save Session ===== */
    user.cleanMessy.sessions.push({
      correct,
      wrong,
      totalQuestions,
      accuracy,
      date: new Date()
    });

    /* ===== Update Streak ===== */
    updateStreak(user);

    await user.save();

    res.json({ success: true });

  } catch (error) {
    console.error("Clean-Messy Save Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


/* ================= SAVE MONEY GAME SESSION ================= */
router.post("/money", authMiddleware, async (req, res) => {
  try {
    const { correct, wrong, totalQuestions } = req.body;

    if (!totalQuestions || totalQuestions === 0) {
      return res.status(400).json({ message: "Invalid totalQuestions" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accuracy = Math.round((correct / totalQuestions) * 100);

    /* ===== Update Totals ===== */
    user.moneyGame.totalAttempts += 1;
    user.moneyGame.totalCorrect += correct;
    user.moneyGame.totalWrong += wrong;

    /* ===== Best Accuracy ===== */
    if (accuracy > user.moneyGame.bestAccuracy) {
      user.moneyGame.bestAccuracy = accuracy;
    }

    /* ===== Improvement Calculation ===== */
    const previousAccuracy = user.moneyGame.lastAccuracy || 0;
    user.moneyGame.improvement = accuracy - previousAccuracy;
    user.moneyGame.lastAccuracy = accuracy;

    /* ===== Badge Assignment ===== */
    user.moneyGame.badge = getBadge(accuracy);

    /* ===== Save Session ===== */
    user.moneyGame.sessions.push({
      correct,
      wrong,
      totalQuestions,
      accuracy,
      date: new Date()
    });

    /* ===== Update Streak ===== */
    updateStreak(user);

    await user.save();

    res.json({ success: true });

  } catch (error) {
    console.error("Money Save Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


/* ================= FETCH USER PROGRESS ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      user: {
        cleanMessy: user.cleanMessy,
        moneyGame: user.moneyGame,
        streak: user.streak,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error("Fetch Progress Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;