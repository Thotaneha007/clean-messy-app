import welcomeImg from "./assets/images/welcome_room.png";

function Home({ setPage }) {
  return (
    <div className="container">
      <div className="card" style={{ padding: '40px', borderRadius: '32px' }}>

        {/* BACK BUTTON */}
        <div className="top-nav">
          <button
            className="back-btn"
            onClick={() => setPage("dashboard")}
            style={{ padding: '10px 20px', borderRadius: '15px' }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* HEADER SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Clean and Messy
          </h1>
          <p className="subtitle" style={{ fontSize: '1.2rem' }}>
            A sensory-friendly journey to understanding our surroundings.
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div style={{ position: 'relative', marginBottom: '35px' }}>
          <img
            src={welcomeImg}
            alt="clean room illustration"
            className="item-image"
            style={{ borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem', color: '#764ba2', backdropFilter: 'blur(5px)' }}>
            ✨ Interactive Learning
          </div>
        </div>

        {/* OVERVIEW */}
        <div style={{ background: 'rgba(100, 116, 139, 0.05)', padding: '25px', borderRadius: '20px', marginBottom: '35px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
            Help your child understand organization and hygiene using simple, calming visual anchors.
            Designed specifically for children who appreciate clarity and routine.
          </p>
        </div>

        {/* PRIMARY ACTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <button
            className="primary-btn"
            onClick={() => setPage("learn")}
            style={{ padding: '20px', borderRadius: '20px', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', color: '#2c3e50', border: 'none' }}
          >
            <span style={{ fontSize: '2rem' }}>📖</span>
            Step 1: Learn
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("game")}
            style={{ padding: '20px', borderRadius: '20px', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', border: '2px solid #a1c4fd' }}
          >
            <span style={{ fontSize: '2rem' }}>🎮</span>
            Step 2: Practice
          </button>
        </div>

        {/* PARENTING SECTION - ENHANCED VISIBILITY */}
        <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '25px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '1rem', letterSpacing: '1px' }}>PARENT & TEACHER TOOLS</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              className="action-btn"
              onClick={() => setPage("habit")}
              style={{
                flex: 1,
                padding: '18px',
                borderRadius: '18px',
                background: 'rgba(79, 172, 254, 0.1)',
                border: '2.5px solid #4facfe',
                fontWeight: '900',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              📝 Record Habits
            </button>

            <button
              className="action-btn"
              onClick={() => setPage("about")}
              style={{
                flex: 1,
                padding: '18px',
                borderRadius: '18px',
                background: 'rgba(79, 172, 254, 0.05)',
                border: '2.5px solid #4facfe',
                fontWeight: '900',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              📖 Program Methodology
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
