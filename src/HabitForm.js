import { useState } from "react";

function HabitForm({ setPage }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [roomClean, setRoomClean] = useState(false);
  const [toysOrganized, setToysOrganized] = useState(false);
  const [handsWashed, setHandsWashed] = useState(false);
  const [clothesFolded, setClothesFolded] = useState(false);
  const [cleanLevel, setCleanLevel] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [mood, setMood] = useState("happy");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) { setMessage("Please enter the child's name."); return; }
    setMessage("Daily habits synchronized successfully!");
    setTimeout(() => setMessage(""), 4000);
  }

  function handleReset() {
    setName(""); setAge(""); setRoomClean(false); setToysOrganized(false);
    setHandsWashed(false); setClothesFolded(false); setCleanLevel("");
    setTimeOfDay(""); setMood("happy"); setNotes(""); setMessage("");
  }

  const inputStyle = {
    width: '100%', padding: '14px', borderRadius: '14px',
    border: '2px solid var(--border-color)', background: 'rgba(255,255,255,0.03)',
    color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
  };

  const sectionStyle = {
    background: 'var(--card-bg)', padding: '22px', borderRadius: '24px',
    border: '2px solid var(--border-color)', boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
  };

  const checkLabel = (active) => ({
    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
    borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', color: 'var(--text-primary)',
    border: `1.5px solid ${active ? '#4facfe' : 'var(--border-color)'}`,
    background: active ? 'rgba(79,172,254,0.1)' : 'transparent', transition: '0.2s'
  });

  const radioLabel = (active, color) => ({
    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
    borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', color: 'var(--text-primary)',
    border: `1.5px solid ${active ? color : 'var(--border-color)'}`,
    background: active ? `${color}18` : 'transparent', transition: '0.2s'
  });

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '25px 20px' }}>

      {/* FULL-WIDTH HEADER — ALWAYS ON TOP */}
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '30px', display: 'block' }}>
        <div style={{ marginBottom: '15px' }}>
          <button onClick={() => setPage("home")} style={{ padding: '10px 25px', borderRadius: '50px', fontWeight: '900', border: '3px solid #4facfe', background: 'rgba(79,172,254,0.1)', color: 'var(--text-primary)', fontSize: '1rem', cursor: 'pointer' }}>
            ← Back to Module
          </button>
        </div>
        <h2 style={{ fontSize: '2.2rem', margin: '0 0 5px 0', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' }}>
          Daily Habit Tracker
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'bold', margin: 0 }}>Record daily cleanliness habits practiced by the child.</p>
      </div>

      {/* 2-COLUMN FORM LAYOUT — BELOW HEADER */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>

        {/* LEFT COL: Child Info + Checkboxes + Mood */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Child Info */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>🧒 Child Details</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 2 }}>
                <label style={{ fontWeight: '900', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                <input type="text" placeholder="Child's name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: '900', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Age</label>
                <input type="number" placeholder="7" value={age} onChange={(e) => setAge(e.target.value)} min="3" max="18" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>✅ Habits Completed</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { s: roomClean, set: setRoomClean, l: "🧹 Room cleaned", id: "rc" },
                { s: toysOrganized, set: setToysOrganized, l: "🧸 Toys organized", id: "to" },
                { s: handsWashed, set: setHandsWashed, l: "🧼 Hands washed", id: "hw" },
                { s: clothesFolded, set: setClothesFolded, l: "👕 Clothes folded", id: "cf" }
              ].map(item => (
                <label key={item.id} htmlFor={item.id} style={checkLabel(item.s)}>
                  <input type="checkbox" id={item.id} checked={item.s} onChange={(e) => item.set(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4facfe', cursor: 'pointer' }} />
                  {item.l}
                </label>
              ))}
            </div>
          </div>

          {/* Mood Dropdown */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>😊 Child's Mood</h3>
            <select value={mood} onChange={(e) => setMood(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}>
              <option value="happy">😊 Happy</option>
              <option value="calm">😌 Calm</option>
              <option value="tired">😴 Tired</option>
              <option value="upset">😟 Upset</option>
              <option value="excited">🤩 Excited</option>
            </select>
          </div>
        </div>

        {/* RIGHT COL: Radios + Textarea + Submit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Time Radio */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>⏰ Time of Practice</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {["Morning", "Afternoon", "Evening"].map(time => (
                <label key={time} htmlFor={`t-${time}`} style={radioLabel(timeOfDay === time, '#6ee7b7')}>
                  <input type="radio" id={`t-${time}`} name="timeOfDay" value={time} checked={timeOfDay === time} onChange={(e) => setTimeOfDay(e.target.value)} style={{ width: '18px', height: '18px', accentColor: '#6ee7b7', cursor: 'pointer' }} />
                  {time}
                </label>
              ))}
            </div>
          </div>

          {/* Rating Radio */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>⭐ Cleanliness Rating</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {["Very Clean", "Satisfactory", "Needs Improvement"].map(level => (
                <label key={level} htmlFor={`l-${level}`} style={radioLabel(cleanLevel === level, '#f6d365')}>
                  <input type="radio" id={`l-${level}`} name="cleanLevel" value={level} checked={cleanLevel === level} onChange={(e) => setCleanLevel(e.target.value)} style={{ width: '18px', height: '18px', accentColor: '#f6d365', cursor: 'pointer' }} />
                  {level === "Very Clean" ? "✨" : level === "Satisfactory" ? "👌" : "💡"} {level}
                </label>
              ))}
            </div>
          </div>

          {/* Notes Textarea */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>📝 Notes</h3>
            <textarea placeholder="Any observations about the child today..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} />
          </div>
        </div>

        {/* FULL WIDTH: SUBMIT ROW */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button type="submit" style={{ flex: 2, maxWidth: '350px', padding: '18px', borderRadius: '50px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', border: 'none', color: 'white', fontWeight: '900', fontSize: '1.15rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(79,172,254,0.3)' }}>
            Submit Record
          </button>
          <button type="button" onClick={handleReset} style={{ flex: 1, maxWidth: '180px', padding: '18px', borderRadius: '50px', background: 'var(--card-bg)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: '900', fontSize: '1rem', cursor: 'pointer' }}>
            Reset
          </button>
        </div>

        {/* FEEDBACK */}
        {message && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '15px', borderRadius: '14px', background: message.includes("Please") ? 'rgba(239,68,68,0.1)' : 'rgba(0,184,148,0.1)', color: message.includes("Please") ? '#ef4444' : '#00b894', fontWeight: '900', border: `2px solid ${message.includes("Please") ? '#ef4444' : '#00b894'}` }}>
            {message}
          </div>
        )}

      </form>
    </div>
  );
}

export default HabitForm;
