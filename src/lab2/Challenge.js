import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

function Challenge({ setPage }) {

  const [target, setTarget] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const totalQuestions = 5;

  const cardRef = useRef(null);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    generateTarget();
  }, []);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "1") addCoin(1);
      if (e.key === "2") addCoin(2);
      if (e.key === "5") addCoin(5);
      if (e.key === "0") addCoin(10);
      if (e.key === "Enter") checkAnswer();
      if (e.key.toLowerCase() === "r") resetTotal();
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  /* ================= GAME LOGIC ================= */
  function generateTarget() {
    const random = Math.floor(Math.random() * 20) + 5;
    setTarget(random);
    setTotal(0);
    setFeedback("");
  }

  function addCoin(value) {
    setTotal(prev => prev + value);
  }

  function resetTotal() {
    setTotal(0);
    setFeedback("");
  }

  async function saveSession(finalCorrect, finalWrong) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/progress/money",
        {
          correct: finalCorrect,
          wrong: finalWrong,
          totalQuestions
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

    } catch (error) {
      console.log("Save Error:", error.response?.data);
    }
  }

  function checkAnswer() {

    const isCorrect = total === target;

    if (isCorrect) {
      setCorrect(prev => prev + 1);
      setFeedback("correct");
    } else {
      setWrong(prev => prev + 1);
      setFeedback("wrong");
    }

    setTimeout(async () => {

      if (questionCount >= totalQuestions) {

        const finalCorrect = isCorrect ? correct + 1 : correct;
        const finalWrong = isCorrect ? wrong : wrong + 1;

        const accuracy = Math.round(
          (finalCorrect / totalQuestions) * 100
        );

        // SAVE REAL SESSION ACCURACY FOR DASHBOARD
        localStorage.setItem("money_accuracy", accuracy);

        await saveSession(finalCorrect, finalWrong);

        setPage("moneyResult", {
          correct: finalCorrect,
          wrong: finalWrong,
          totalQuestions,
          accuracy
        });

      } else {
        setQuestionCount(prev => prev + 1);
        generateTarget();
      }

    }, 1000);
  }

  /* ================= SCREEN CAPTURE ================= */
  async function captureScreen() {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "money-challenge-session.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  /* ================= UI ================= */
  return (
    <div className="container">
      <div className="card" ref={cardRef} style={{ padding: '40px', borderRadius: '32px' }}>
        
        {/* BACK BUTTON */}
        <div className="top-nav">
          <button
            className="back-btn"
            onClick={() => setPage("money")}
            style={{ padding: '10px 20px', borderRadius: '15px' }}
          >
            ← Back to Money Home
          </button>
        </div>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '1.8rem', background: 'linear-gradient(90deg, #f6d365, #fda085)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            Money Challenge
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Question {questionCount} of {totalQuestions}</p>
        </div>

        {/* TARGET BOX */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', 
          padding: '30px', 
          borderRadius: '24px', 
          textAlign: 'center', 
          boxShadow: '0 10px 25px rgba(253, 160, 133, 0.3)',
          marginBottom: '25px'
        }}>
          <div style={{ fontSize: '1.2rem', color: '#635100', fontWeight: '800', opacity: 0.8 }}>PLEASE MAKE</div>
          <div style={{ fontSize: '4.5rem', fontWeight: '900', color: '#2d3436', textShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>₹{target}</div>
        </div>

        {/* CURRENT TOTAL */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.08)', 
          padding: '15px', 
          borderRadius: '15px', 
          textAlign: 'center', 
          fontSize: '1.3rem', 
          fontWeight: '900',
          marginBottom: '25px',
          border: '2px solid var(--border-color)',
          color: total === target ? '#00b894' : 'var(--text-primary)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          Current Total: ₹{total} {total > target && "⚠️"}
        </div>

        {/* COIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
          {[1, 2, 5, 10].map(val => (
            <button
              key={val}
              onClick={() => addCoin(val)}
              className="coin-btn-interactive"
              style={{
                aspectRatio: '1/1',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
                border: 'none',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 5px 0 #d4a017, 0 10px 20px rgba(0,0,0,0.1)',
                transition: '0.1s'
              }}
            >
              ₹{val}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <button 
            className="primary-btn" 
            onClick={checkAnswer}
            style={{ padding: '15px', borderRadius: '15px', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', fontWeight: 'bold' }}
          >
            Check Answer
          </button>

          <button 
            className="secondary-btn" 
            onClick={resetTotal}
            style={{ padding: '15px', borderRadius: '15px', fontWeight: 'bold' }}
          >
            Clear All
          </button>
        </div>

        {/* FEEDBACK */}
        {feedback && (
          <div style={{ 
            padding: '15px', 
            borderRadius: '15px', 
            textAlign: 'center', 
            fontWeight: 'bold',
            background: feedback === 'correct' ? '#e1fcf2' : '#fde2e2',
            color: feedback === 'correct' ? '#00b894' : '#ef4444',
            marginBottom: '15px'
          }}>
            {feedback === "correct" ? "✨ Brilliant! That's correct!" : "💡 Almost there! Try again."}
          </div>
        )}

        {/* PROGRESS STATS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          <span>✅ Correct: {correct}</span>
          <span>❌ Missed: {wrong}</span>
        </div>

        <button 
          className="secondary-btn" 
          onClick={captureScreen}
          style={{ width: '100%', padding: '12px', borderRadius: '120px', opacity: 0.7, fontSize: '0.85rem' }}
        >
          📸 Save Progress to Word Doc (Screenshot)
        </button>

      </div>
    </div>
  );
}

export default Challenge;