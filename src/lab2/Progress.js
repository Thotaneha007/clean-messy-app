import { motion } from "framer-motion";

function Progress({ setPage, resultData }) {
  if (!resultData) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="card" style={{ textAlign: 'center', padding: '50px', borderRadius: '32px', border: '2px solid var(--border-color)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❓</div>
          <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>No session data found.</h2>
          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
            style={{ padding: '15px 35px', borderRadius: '15px', fontWeight: '900' }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { correct, wrong, totalQuestions, accuracy } = resultData;

  // PREMIUM BADGE SYSTEM
  const getBadgeInfo = (acc) => {
    if (acc === 100) return { icon: "💎", label: "Financial Wizard", color: "#4facfe", message: "Perfection! Every coin and note matched perfectly." };
    if (acc >= 80) return { icon: "🏆", label: "Money Expert", color: "#00b894", message: "Outstanding! You have a great eye for value." };
    if (acc >= 50) return { icon: "🌟", label: "Smart Learner", color: "#f6d365", message: "Great progress! Your skills are growing fast." };
    return { icon: "🌱", label: "Money Learner", color: "#a78bfa", message: "Keep practicing! Every session makes you stronger." };
  };

  const badge = getBadgeInfo(accuracy);

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ 
          padding: '60px 40px', 
          borderRadius: '40px', 
          textAlign: 'center', 
          background: 'var(--card-bg)', 
          border: '3px solid var(--border-color)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backdropFilter: 'blur(16px)'
        }}
      >
        <h2 style={{ fontSize: '2.8rem', margin: '0 0 10px 0', color: 'var(--text-primary)', fontWeight: '900', letterSpacing: '-1px' }}>
          Session Complete!
        </h2>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '10px 30px', 
          borderRadius: '50px', 
          border: `2px solid ${badge.color}`,
          color: badge.color,
          fontSize: '1.4rem',
          fontWeight: '900',
          marginBottom: '20px',
          display: 'inline-block'
        }}>
          {badge.label}
        </div>

        <p style={{ fontSize: '1.2rem', opacity: 0.8, color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '40px', fontWeight: 'bold' }}>
          {badge.message}
        </p>

        {/* PERFORMANCE STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', width: '100%', marginBottom: '40px' }}>
          {[
            { label: "Accuracy", val: `${accuracy}%`, color: badge.color, icon: "🎯" },
            { label: "Correct", val: correct, color: "#00b894", icon: "✅" },
            { label: "Wrong", val: wrong, color: "#ef4444", icon: "❌" }
          ].map((stat, i) => (
            <div key={i} style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '30px', 
              borderRadius: '25px', 
              border: '2px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{stat.label}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: stat.color }}>{stat.val}</div>
            </div>
          ))}
        </div>

        {/* PROGRESS BAR */}
        <div style={{ width: '100%', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--border-color)', marginBottom: '50px' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${accuracy}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${badge.color}, #00f2fe)`, boxShadow: `0 0 20px ${badge.color}44` }} 
          />
        </div>

        {/* ACTIONS */}
        <div style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="primary-btn"
            onClick={() => window.location.reload()}
            style={{ 
              padding: '22px 50px', 
              borderRadius: '50px', 
              fontSize: '1.3rem', 
              fontWeight: '900',
              background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
              boxShadow: '0 10px 30px rgba(79, 172, 254, 0.4)',
              border: 'none',
              color: 'white'
            }}
          >
            🔄 New Session
          </button>
          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
            style={{ 
              padding: '22px 50px', 
              borderRadius: '50px', 
              fontSize: '1.3rem', 
              fontWeight: '900',
              background: 'var(--card-bg)',
              border: '3px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            🏠 Dashboard
          </button>
        </div>

      </motion.div>
    </div>
  );
}

export default Progress;