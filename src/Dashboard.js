import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Dashboard({ setPage }) {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      // FOR GUESTS: NO MOCK DATA. FETCH REAL SCORES IF SESSION EXISTS.
      if (!token || token === "guest_token") {
        const cleanAcc = localStorage.getItem("clean_messy_accuracy");
        const moneyAcc = localStorage.getItem("money_accuracy");

        setUserData({
          cleanMessy: { totalAttempts: cleanAcc ? 1 : 0, bestAccuracy: cleanAcc ? parseInt(cleanAcc) : 0, badge: cleanAcc ? "Learner" : "None" },
          moneyGame: { totalAttempts: moneyAcc ? 1 : 0, bestAccuracy: moneyAcc ? parseInt(moneyAcc) : 0, badge: moneyAcc ? "Expert" : "None" },
          streak: { currentStreak: 0, longestStreak: 0 }
        });
        setLoading(false);
        return;
      }

      try {
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
        // CLEAN UP FALLBACK
        setUserData({
          cleanMessy: { totalAttempts: 0, bestAccuracy: 0, badge: "None" },
          moneyGame: { totalAttempts: 0, bestAccuracy: 0, badge: "None" },
          streak: { currentStreak: 0, longestStreak: 0 }
        });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // FETCH LATEST SESSION SCORE FROM LOCAL STORAGE
  const lastSessionScore = localStorage.getItem("last_accuracy");

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <motion.div 
        className="card dashboard-card"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ padding: '30px', borderRadius: '40px' }}
      >

        {/* ================= HERO INTRO ================= */}
        <div style={{ textAlign: 'center', marginBottom: '30px', width: '100%' }}>
          <h1 style={{ 
            background: 'linear-gradient(90deg, #4facfe, #00f2fe)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            fontSize: '2.4rem',
            letterSpacing: '-1px',
            marginBottom: '10px',
            fontWeight: '900'
          }}>
            Welcome Back, {userData?.name || "Guest"}!
          </h1>
          {lastSessionScore && (
            <p style={{ fontSize: '1.2rem', color: '#4facfe', fontWeight: '900', margin: '0 0 10px 0' }}>
              🎯 Correctness Score: {lastSessionScore}%
            </p>
          )}
          <p className="subtitle" style={{ fontSize: '1.1rem', margin: '0 auto', color: 'var(--text-secondary)', fontWeight: 'bold', maxWidth: '500px' }}>
            Structured visual growth and child-centric progress tracking.
          </p>
        </div>

        {/* ================= FULL WIDTH STREAK (FIXED OVERFLOW) ================= */}
        <motion.div 
          variants={itemVariants} 
          className="dashboard-box" 
          style={{ 
            background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', 
            textAlign: "center", 
            padding: '25px 15px', 
            borderRadius: '24px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(161, 196, 253, 0.3)',
            color: '#2c3e50',
            border: '2px solid rgba(255,255,255,0.6)',
            width: '100%',
            maxWidth: '900px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ fontSize: '1rem', fontWeight: '900', opacity: 0.9, letterSpacing: '1.5px' }}>🔥 CURRENT LEARNING STREAK</div>
          <h2 style={{ fontSize: '3.2rem', margin: '10px 0', textShadow: '0 3px 10px rgba(0,0,0,0.1)', fontWeight: '900' }}>{streak.currentStreak || 0} Days</h2>
          <div style={{ 
            display: 'inline-block', 
            background: 'white', 
            padding: '10px 25px', 
            borderRadius: '50px',
            fontWeight: '900',
            fontSize: '1rem',
            color: '#4a90e2',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            🏆 Personal Best: {streak.longestStreak || 0} Days
          </div>
        </motion.div>

        {/* ================= MODERN GRID LAYOUT ================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px', marginBottom: '40px', maxWidth: '1000px', margin: '0 auto 40px auto' }}>

          {/* 🧹 CLEAN & MESSY BOX */}
          <motion.div variants={itemVariants} className="dashboard-box" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(16px)', border: '2px solid var(--border-color)', padding: '30px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4facfe', fontSize: '1.6rem', marginTop: 0, fontWeight: '900' }}>🧹 Clean & Messy</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '25px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-primary)' }}>{clean.totalAttempts || 0}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '900', letterSpacing: '1px' }}>ATTEMPTS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#00b894' }}>{clean.bestAccuracy || 0}%</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '900', letterSpacing: '1px' }}>TOP SCORE</div>
              </div>
            </div>
            
            <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '30px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ height: '100%', width: `${clean.bestAccuracy || 0}%`, background: 'linear-gradient(90deg, #4facfe, #00f2fe)', transition: 'width 1.5s ease' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginTop: '30px', fontWeight: '900' }}>
              <span style={{ color: '#4facfe' }}>🏅 {clean.badge || "Novice"}</span>
              <span style={{ color: '#00b894' }}>{getPerformanceLabel(clean.bestAccuracy || 0)}</span>
            </div>
          </motion.div>

          {/* 💰 MONEY LEARNING BOX */}
          <motion.div variants={itemVariants} className="dashboard-box" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(16px)', border: '2px solid var(--border-color)', padding: '30px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f6d365', fontSize: '1.6rem', marginTop: 0, fontWeight: '900' }}>🪙 Money Match</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '25px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-primary)' }}>{money.totalAttempts || 0}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '900', letterSpacing: '1px' }}>SESSIONS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#00b894' }}>{money.bestAccuracy || 0}%</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '900', letterSpacing: '1px' }}>TOP SCORE</div>
              </div>
            </div>
            
            <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '30px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ height: '100%', width: `${money.bestAccuracy || 0}%`, background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', transition: 'width 1.5s ease' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginTop: '30px', fontWeight: '900' }}>
              <span style={{ color: '#f6d365' }}>🏅 {money.badge || "Stable"}</span>
              <span style={{ color: '#fda085' }}>{getPerformanceLabel(money.bestAccuracy || 0)}</span>
            </div>
          </motion.div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <h3 style={{ marginTop: '20px', marginBottom: '25px', textAlign: 'center', color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: '900' }}>🚀 Start Your Learning Session</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto 40px auto' }}>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage("home")}
            style={{
              background: 'linear-gradient(135deg, #FF9A9E, #FECFEF)',
              borderRadius: '24px',
              padding: '30px',
              cursor: 'pointer',
              color: '#333',
              boxShadow: '0 12px 30px rgba(255, 154, 158, 0.4)',
              textAlign: 'center',
              fontWeight: '900',
              fontSize: '1.3rem'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🧹✨</div>
            Play Clean & Messy
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage("money")}
            style={{
              background: 'linear-gradient(135deg, #84FAB0, #8FD3F4)',
              borderRadius: '24px',
              padding: '30px',
              cursor: 'pointer',
              color: '#333',
              boxShadow: '0 12px 30px rgba(132, 250, 176, 0.4)',
              textAlign: 'center',
              fontWeight: '900',
              fontSize: '1.3rem'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🪙🛒</div>
            Money Learning
          </motion.div>

        </div>

        {/* ================= SECONDARY ACTIONS - ENHANCED VISIBILITY ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '800px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(79, 172, 254, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage("activity")}
              style={{ 
                flex: 1,
                minWidth: '350px',
                background: 'rgba(255, 255, 255, 0.1)', 
                border: '3px solid #4facfe', 
                fontWeight: '900', 
                color: 'var(--text-primary)',
                borderRadius: '24px',
                padding: '22px',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                boxShadow: '0 8px 30px rgba(79, 172, 254, 0.15)',
                cursor: 'pointer'
              }}
            >
              📊 Manage Daily Habits
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(79, 172, 254, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage("product")}
              style={{ 
                flex: 1,
                minWidth: '350px',
                background: 'rgba(255, 255, 255, 0.1)', 
                border: '3px solid #4facfe', 
                fontWeight: '900', 
                color: 'var(--text-primary)',
                borderRadius: '24px',
                padding: '22px',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                boxShadow: '0 8px 30px rgba(79, 172, 254, 0.15)',
                cursor: 'pointer'
              }}
            >
              📋 Project Methodology
            </motion.button>
          </div>

          <motion.button
             whileHover={{ scale: 1.1, color: '#f87171' }}
             whileTap={{ scale: 0.9 }}
             onClick={() => {
               localStorage.removeItem("token");
               window.location.reload();
             }}
             style={{ 
               color: '#ef4444', 
               fontWeight: '900', 
               background: 'transparent', 
               border: 'none', 
               marginTop: '20px', 
               cursor: 'pointer',
               fontSize: '1.1rem',
               padding: '10px 30px'
             }}
          >
            🚪 Logout Securely
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
}

export default Dashboard;