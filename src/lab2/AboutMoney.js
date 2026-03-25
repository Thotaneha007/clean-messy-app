import React from "react";

function AboutMoney({ setPage }) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <div style={{ marginBottom: '15px' }}>
          <button onClick={() => setPage("money")} style={{ padding: '10px 25px', borderRadius: '50px', fontWeight: '900', border: '3px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>
            ← Back to Money Learning
          </button>
        </div>
        <h2 style={{ fontSize: '2.2rem', margin: '0 0 8px 0', background: 'linear-gradient(90deg, #f6d365, #fda085)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' }}>
          About — Money Mastery Module
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 'bold', margin: 0, fontSize: '1.05rem' }}>
          An interactive currency recognition activity for children with ASD
        </p>
      </div>

      {/* DESCRIPTION */}
      <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '24px', border: '2px solid var(--border-color)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#f6d365', fontSize: '1.2rem' }}>🎯 What is this Module?</h3>
        <p style={{ lineHeight: '1.8', color: 'var(--text-primary)', margin: 0 }}>
          The Money Mastery module teaches children to recognize and add Indian currency coins (₹1, ₹2, ₹5, ₹10). 
          Children are presented with <strong>shopping scenarios</strong> where they must select the correct combination 
          of coins to match a target price. The module builds <strong>mathematical confidence</strong> through repetitive, 
          low-pressure practice with immediate visual feedback. Each session tracks accuracy and saves progress to help 
          parents and teachers monitor improvement over time.
        </p>
      </div>

      {/* 2-COLUMN: APPROACH */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--card-bg)', padding: '25px', borderRadius: '24px', border: '2px solid #f6d365' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f6d365', fontSize: '1.1rem' }}>🧮 Concrete Learning</h3>
          <p style={{ lineHeight: '1.7', color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem' }}>
            Visual coin representations with realistic styling help children connect abstract values to tangible objects they encounter daily.
          </p>
        </div>
        <div style={{ background: 'var(--card-bg)', padding: '25px', borderRadius: '24px', border: '2px solid #fda085' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#fda085', fontSize: '1.1rem' }}>🛒 Real-World Context</h3>
          <p style={{ lineHeight: '1.7', color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem' }}>
            Shopping-based scenarios provide practical context, making the learning transferable to real-life situations like buying snacks or toys.
          </p>
        </div>
      </div>

      {/* LEARNING FLOW */}
      <div style={{ background: 'var(--card-bg)', padding: '25px', borderRadius: '24px', border: '2px solid var(--border-color)', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>📋 Learning Flow</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {[
            { num: "1", label: "Recognize", desc: "Learn coin values (₹1–₹10)" },
            { num: "2", label: "Calculate", desc: "Match coins to target prices" },
            { num: "3", label: "Review", desc: "View accuracy and progress" }
          ].map((s, i) => (
            <div key={i} style={{ flex: '1', minWidth: '150px', display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', borderRadius: '16px', border: '1.5px solid var(--border-color)', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f6d365, #fda085)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0 }}>{s.num}</div>
              <div>
                <div style={{ fontWeight: '900', color: 'var(--text-primary)' }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TECH STACK */}
      <div style={{ background: 'var(--card-bg)', padding: '25px', borderRadius: '24px', border: '2px solid var(--border-color)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>🛠️ Built With</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {["React.js", "Node.js", "Express", "MongoDB", "JWT Auth", "Framer Motion"].map(t => (
            <span key={t} style={{ padding: '8px 16px', borderRadius: '50px', border: '1.5px solid var(--border-color)', fontWeight: '900', fontSize: '0.85rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.03)' }}>{t}</span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AboutMoney;
