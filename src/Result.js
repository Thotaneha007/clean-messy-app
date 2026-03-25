function Result({ setPage, resultData }) {
  if (!resultData) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❓</div>
          <h2 style={{ marginBottom: '20px' }}>No session data found.</h2>
          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
            style={{ padding: '15px 30px', borderRadius: '15px', fontWeight: 'bold' }}
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { correct, wrong, totalQuestions, accuracy } = resultData;

  // SAVE REAL SESSION ACCURACY FOR DASHBOARD
  localStorage.setItem("clean_messy_accuracy", accuracy);

  /* ================= STAR CALCULATION ================= */
  let stars = 1;
  if (accuracy >= 90) stars = 3;
  else if (accuracy >= 60) stars = 2;

  /* ================= PERFORMANCE LEVEL ================= */
  let level = "Rising Star";
  let color = "#a78bfa"; // default lavender
  if (accuracy >= 90) { level = "Master Scout"; color = "#6ee7b7"; }
  else if (accuracy >= 70) { level = "Brilliant Learner"; color = "#4facfe"; }
  else if (accuracy >= 50) { level = "Steadfast Clinician"; color = "#f6d365"; }

  /* ================= ENCOURAGEMENT MESSAGE ================= */
  let message = "Brilliant effort! Every practice session builds confidence.";
  if (accuracy === 100) message = "Perfection! You've mastered every visual detail today!";
  else if (accuracy >= 75) message = "Outstanding progress! Your focus is truly impressive.";
  else if (accuracy < 50) message = "That's okay! Learning is a journey, and you're moving forward.";

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center', padding: '30px 20px' }}>
      <div className="card result-card" style={{ padding: '50px', borderRadius: '32px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        


        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Session Completed!
        </h2>
        <p className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '40px' }}>{message}</p>

        {/* PERFORMANCE GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{totalQuestions}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>TASKS</div>
          </div>

          <div style={{ background: 'rgba(110, 231, 183, 0.1)', padding: '20px', borderRadius: '24px', border: '1px solid #6ee7b7', boxShadow: '0 8px 30px rgba(110, 231, 183, 0.1)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00b894' }}>{correct}</div>
            <div style={{ fontSize: '0.8rem', color: '#00b894', fontWeight: 'bold' }}>CORRECT</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: color }}>{accuracy}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>ACCURACY</div>
          </div>

        </div>

        {/* STAR RATING */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '3rem', letterSpacing: '20px' }}>
            {"⭐".repeat(stars)}
            <span style={{ opacity: 0.2 }}>{"⭐".repeat(3 - stars)}</span>
          </div>
          <p style={{ marginTop: '15px', fontSize: '1.2rem', fontWeight: 'bold', color: color }}>Rank: {level}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button
            className="primary-btn"
            onClick={() => setPage("game")}
            style={{ padding: '18px 40px', borderRadius: '20px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', fontWeight: '900', color: 'white' }}
          >
            PRACTICE AGAIN
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
            style={{ padding: '18px 40px', borderRadius: '20px', fontWeight: '900', background: 'var(--card-bg)', border: '2px solid var(--border-color)' }}
          >
            DASHBOARD
          </button>
        </div>

        <p style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.6, fontWeight: 'bold' }}>
          Consistency is the key to mastering new skills.
        </p>

      </div>
    </div>
  );
}

export default Result;