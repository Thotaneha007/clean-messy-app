function ProductDetails({ setPage }) {
  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="card product-card" style={{ padding: '60px 40px', borderRadius: '40px', background: 'var(--card-bg)', border: '3px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* BACK BUTTON */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <button
            className="back-btn"
            onClick={() => setPage("dashboard")}
            style={{ padding: '12px 30px', borderRadius: '50px', fontWeight: '900' }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '10px', 
            background: 'linear-gradient(90deg, #4facfe, #00f2fe)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            fontWeight: '900',
            letterSpacing: '-1.5px'
          }}>
            Autism Learning Portal
          </h1>
          <p className="subtitle" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>A Structured Visual Learning System for Autism Support</p>
        </div>

        {/* INFO CARDS (CENTERED GRID) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '50px', width: '100%' }}>
          
          {/* STUDENT DETAILS */}
          <div style={{ background: 'rgba(79, 172, 254, 0.05)', padding: '35px', borderRadius: '32px', border: '2px solid rgba(79, 172, 254, 0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👤</div>
            <h3 style={{ color: '#4facfe', marginTop: 0, fontSize: '1.5rem' }}>Student Profile</h3>
            <p style={{ fontSize: '1.2rem', margin: '5px 0' }}><strong>Name:</strong> Thota Neha</p>
            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Roll: CB.SC.U4CSE23165</p>
            <div style={{ marginTop: '15px', background: 'rgba(79, 172, 254, 0.1)', padding: '8px', borderRadius: '12px', display: 'inline-block', fontWeight: 'bold', color: '#4facfe' }}>
              FullStack Development
            </div>
          </div>

          {/* TEACHER INFO */}
          <div style={{ background: 'rgba(0, 184, 148, 0.05)', padding: '35px', borderRadius: '32px', border: '2px solid rgba(0, 184, 148, 0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👨‍🏫</div>
            <h3 style={{ color: '#00b894', marginTop: 0, fontSize: '1.5rem' }}>Course Mentor</h3>
            <p style={{ fontSize: '1.3rem', fontWeight: '900', margin: '5px 0' }}>Dr. T. Senthil Kumar</p>
            <p style={{ opacity: 0.8 }}>Professor, Amrita School of Computing</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Amrita Vishwa Vidyapeetham</p>
          </div>

        </div>

        {/* ARCHITECTURE & TECH */}
        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--text-primary)' }}>System Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', textAlign: 'left' }}>
            
            <div style={{ padding: '20px', borderLeft: '4px solid #4facfe', background: 'rgba(255,255,255,0.02)', borderRadius: '0 20px 20px 0' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4facfe' }}>🏗️ Project Architecture</h4>
              <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                Developed using the <strong>MERN Stack</strong> to provide a seamless, sensory-friendly experience 
                combining visual sorting tasks and financial literacy exercises for children with ASD.
              </p>
            </div>

            <div style={{ padding: '20px', borderLeft: '4px solid #f6d365', background: 'rgba(255,255,255,0.02)', borderRadius: '0 20px 20px 0' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#f6d365' }}>🛠️ Tech Stack</h4>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li><strong>React.js</strong> – Sensory-friendly UI</li>
                <li><strong>Node/Express</strong> – Session Controllers</li>
                <li><strong>MongoDB</strong> – Progress Database</li>
                <li><strong>JWT/Bcrypt</strong> – Secure Access</li>
              </ul>
            </div>

          </div>
        </div>

        {/* IMPACT & REPOSITORY (CENTERED) */}
        <div style={{ 
          marginTop: '60px', 
          width: '100%', 
          maxWidth: '800px', 
          background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))', 
          padding: '40px', 
          borderRadius: '32px', 
          border: '1px solid rgba(79, 172, 254, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '1.8rem' }}>🌟 Educational Impact</h3>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9 }}>
            Designed to reduce sensory overload, enhance short-term memory, and build confidence through 
            structured, non-pressure activities. This project demonstrates how technology can bridge 
            learning gaps for neurodivergent children.
          </p>
          
          <div style={{ paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', opacity: 0.6, marginBottom: '10px', letterSpacing: '2px' }}>GITHUB REPOSITORY</label>
            <code style={{ 
              background: 'rgba(0,0,0,0.2)', 
              padding: '12px 25px', 
              borderRadius: '12px', 
              fontSize: '1.1rem', 
              color: '#4facfe',
              border: '1px solid rgba(79, 172, 254, 0.3)'
            }}>
              https://github.com/Thotaneha007/clean-messy-app
            </code>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
