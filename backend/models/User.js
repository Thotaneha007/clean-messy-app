const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    /* ================= CLEAN & MESSY ================= */
    cleanMessy: {
      totalAttempts: { type: Number, default: 0 },
      totalCorrect: { type: Number, default: 0 },
      totalWrong: { type: Number, default: 0 },
      bestAccuracy: { type: Number, default: 0 },

      // 🔥 NEW FIELDS
      lastAccuracy: { type: Number, default: 0 },
      improvement: { type: Number, default: 0 },
      badge: { type: String, default: "None" },

      sessions: [
        {
          correct: Number,
          wrong: Number,
          totalQuestions: Number,
          accuracy: Number,
          difficulty: { type: String, default: "easy" },
          date: { type: Date, default: Date.now }
        }
      ]
    },

    /* ================= MONEY GAME ================= */
    moneyGame: {
      totalAttempts: { type: Number, default: 0 },
      totalCorrect: { type: Number, default: 0 },
      totalWrong: { type: Number, default: 0 },
      bestAccuracy: { type: Number, default: 0 },

      // 🔥 NEW FIELDS
      lastAccuracy: { type: Number, default: 0 },
      improvement: { type: Number, default: 0 },
      badge: { type: String, default: "None" },

      sessions: [
        {
          correct: Number,
          wrong: Number,
          totalQuestions: Number,
          accuracy: Number,
          difficulty: { type: String, default: "easy" },
          date: { type: Date, default: Date.now }
        }
      ]
    },

    /* ================= STREAK SYSTEM ================= */
    streak: {
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      lastPlayedDate: { type: Date }
    },

    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);