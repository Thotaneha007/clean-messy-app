function MoneyHome({ setPage }) {
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
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Money Learning
          </h1>
          <p className="subtitle" style={{ fontSize: '1.2rem' }}>
            Discover and master the value of Indian coins.
          </p>
        </div>

        {/* COIN DISPLAY */}
        <div style={{ background: 'rgba(253, 203, 110, 0.1)', padding: '30px', borderRadius: '24px', marginBottom: '35px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#e17055' }}>💰 Indian Currency Coins</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '15px', flexWrap: 'wrap' }}>
            {[1, 2, 5, 10].map(val => (
              <div key={val} style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#635100',
                boxShadow: '0 8px 0 #d4a017, 0 10px 20px rgba(0,0,0,0.1)',
                border: '2px solid #f9ca24'
              }}>
                ₹{val}
              </div>
            ))}
          </div>

          <p className="calm-text" style={{ marginTop: '25px', textAlign: 'center', fontWeight: 'bold' }}>
            Each coin has a unique value.  
            Combine them to make a total amount!
          </p>
        </div>

        {/* LEARNING GOALS */}
        <div style={{ padding: '20px', borderRadius: '20px', border: '2px solid var(--border-color)', marginBottom: '35px', background: 'var(--card-bg)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)' }}>💡 Learning Objectives:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 'bold' }}>🔍 Recognition</div>
            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 'bold' }}>➕ Addition</div>
            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 'bold' }}>🧮 Calculations</div>
            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-color)', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 'bold' }}>🛒 Shopping Logic</div>
          </div>
        </div>

        {/* PRIMARY ACTIONS */}
        <button
          className="primary-btn"
          onClick={() => setPage("challenge")}
          style={{ 
            width: '100%', 
            padding: '20px', 
            borderRadius: '20px', 
            fontSize: '1.2rem', 
            background: 'linear-gradient(90deg, #f6d365, #fda085)', 
            border: 'none', 
            color: '#333', 
            fontWeight: 'bold',
            boxShadow: '0 8px 25px rgba(253, 160, 133, 0.4)',
            marginBottom: '15px'
          }}
        >
          🚀 Start Challenge Activity
        </button>

        <button
          onClick={() => setPage("aboutMoney")}
          style={{ 
            width: '100%', 
            padding: '16px', 
            borderRadius: '18px', 
            fontSize: '1rem', 
            background: 'rgba(253, 203, 110, 0.1)', 
            border: '2px solid #fda085', 
            color: 'var(--text-primary)', 
            fontWeight: '900',
            cursor: 'pointer'
          }}
        >
          📖 Program Methodology (About Module)
        </button>

      </div>
    </div>
  );
}

export default MoneyHome;
