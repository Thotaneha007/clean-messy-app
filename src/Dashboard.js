import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ setPage }) {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/progress",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (res.data.success) {
          setUserData(res.data.user);
        }

      } catch (err) {
        setUserData(null);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const clean = userData?.cleanMessy || {};
  const money = userData?.moneyGame || {};
  const streak = userData?.streak || {};

  function getPerformanceLabel(accuracy) {
    if (accuracy >= 90) return "🌟 Excellent";
    if (accuracy >= 75) return "👍 Improving";
    if (accuracy >= 50) return "📈 Developing";
    return "💡 Keep Practicing";
  }

  return (
    <div className="container">
      <div className="card dashboard-card">

        <h1>📊 Learning Dashboard</h1>
        <p className="subtitle">
          Structured progress and calm learning growth.
        </p>

        {/* ================= STREAK SECTION ================= */}
        <div className="dashboard-box" style={{ textAlign: "center" }}>
          <h3>🔥 Learning Streak</h3>
          <h2>{streak.currentStreak || 0} Days</h2>
          <p>Longest Streak: {streak.longestStreak || 0} Days</p>
        </div>

        {/* ================= CLEAN CARD ================= */}
        <div className="dashboard-box">

          <h3>🧹 Clean & Messy</h3>

          <div className="dashboard-stats">
            <div>
              <p>Total Attempts</p>
              <h2>{clean.totalAttempts || 0}</h2>
            </div>

            <div>
              <p>Best Accuracy</p>
              <h2>{clean.bestAccuracy || 0}%</h2>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${clean.bestAccuracy || 0}%` }}
            />
          </div>

          <p style={{ marginTop: "8px" }}>
            Last Accuracy: {clean.lastAccuracy || 0}%
          </p>

          <p>
            Improvement: {clean.improvement > 0 ? "⬆ +" : ""}
            {clean.improvement || 0}%
          </p>

          <p>
            Badge: <strong>{clean.badge || "None"}</strong>
          </p>

          <p className="performance-label">
            {getPerformanceLabel(clean.bestAccuracy || 0)}
          </p>

        </div>

        {/* ================= MONEY CARD ================= */}
        <div className="dashboard-box">

          <h3>💰 Money Learning</h3>

          <div className="dashboard-stats">
            <div>
              <p>Total Sessions</p>
              <h2>{money.totalAttempts || 0}</h2>
            </div>

            <div>
              <p>Best Accuracy</p>
              <h2>{money.bestAccuracy || 0}%</h2>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${money.bestAccuracy || 0}%` }}
            />
          </div>

          <p style={{ marginTop: "8px" }}>
            Last Accuracy: {money.lastAccuracy || 0}%
          </p>

          <p>
            Improvement: {money.improvement > 0 ? "⬆ +" : ""}
            {money.improvement || 0}%
          </p>

          <p>
            Badge: <strong>{money.badge || "None"}</strong>
          </p>

          <p className="performance-label">
            {getPerformanceLabel(money.bestAccuracy || 0)}
          </p>

        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="dashboard-buttons">

          <button
            className="primary-btn"
            onClick={() => setPage("home")}
          >
            Open Clean & Messy
          </button>

          <button
            className="primary-btn"
            onClick={() => setPage("money")}
          >
            Open Money Learning
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("activity")}
          >
            Manage Activities
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("product")}
          >
            View Product Details
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;