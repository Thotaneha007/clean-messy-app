import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

/* Import images */
import cleanRoom from "./assets/images/01_clean_room.jpg";
import messyRoom from "./assets/images/02_messy_room.jpg";
import cleanToys from "./assets/images/03_clean_toys.jpg";
import messyToys from "./assets/images/04_messy_toys.png";
import cleanClothes from "./assets/images/05_clean_clothes.png";
import messyClothes from "./assets/images/06_messy_clothes.png";
import cleanPlate from "./assets/images/07_clean_plate.png";
import dirtyPlate from "./assets/images/08_dirty_plate.png";

function Game({ setPage }) {

  const items = [
    { text: "The room is clean", answer: "clean", image: cleanRoom },
    { text: "The room is messy", answer: "messy", image: messyRoom },
    { text: "Toys are kept properly", answer: "clean", image: cleanToys },
    { text: "Toys are on the floor", answer: "messy", image: messyToys },
    { text: "Clothes are folded", answer: "clean", image: cleanClothes },
    { text: "Clothes are scattered", answer: "messy", image: messyClothes },
    { text: "Plate is clean", answer: "clean", image: cleanPlate },
    { text: "Plate is dirty", answer: "messy", image: dirtyPlate }
  ];

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalQuestions = items.length;
  const cardRef = useRef(null);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    function handleKey(e) {
      if (e.key.toLowerCase() === "c") choose("clean");
      if (e.key.toLowerCase() === "m") choose("messy");
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  /* ================= SAVE SESSION ================= */
  async function saveSession(finalCorrect, finalWrong) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/progress/clean-messy",
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

  /* ================= GAME LOGIC ================= */
  function choose(option) {

    const isCorrect = option === items[index].answer;

    // Calculate updated values safely
    const updatedCorrect = isCorrect ? correct + 1 : correct;
    const updatedWrong = isCorrect ? wrong : wrong + 1;

    setCorrect(updatedCorrect);
    setWrong(updatedWrong);

    setMessage(
      isCorrect
        ? "✅ Correct! Well done."
        : "❌ That's okay. Let’s keep learning."
    );

    setTimeout(async () => {

      setMessage("");

      if (index === totalQuestions - 1) {

        setLoading(true);

        await saveSession(updatedCorrect, updatedWrong);

        const accuracy = Math.round(
          (updatedCorrect / totalQuestions) * 100
        );

        setPage("result", {
          correct: updatedCorrect,
          wrong: updatedWrong,
          totalQuestions,
          accuracy
        });

      } else {
        setIndex(prev => prev + 1);
      }

    }, 800);
  }

  /* ================= SCREEN CAPTURE ================= */
  async function captureScreen() {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "clean-messy-session.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  /* ================= UI ================= */
  return (
    <div className="container">
      <div className="card" ref={cardRef}>
        
        {/* BACK BUTTON */}
        <div className="top-nav">
          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '10px' }}>Sorting Game</h2>
        <p className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '25px', opacity: 0.8 }}>
          Press C for Clean | M for Messy
        </p>

        {/* IMAGE CARD */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '650px', margin: '0 auto' }}>
          <img
            src={items[index].image}
            alt="sorting task"
            style={{ 
              borderRadius: '35px', 
              border: '4px solid var(--border-color)', 
              width: '100%', 
              display: 'block',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
            }}
          />
          
          {message && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                top: '40%',
                left: '20%',
                right: '20%',
                padding: '20px',
                borderRadius: '20px',
                background: message.includes('✅') ? '#00b894' : '#ef4444',
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: '900',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                textAlign: 'center',
                zIndex: 10
              }}
            >
              {message}
            </motion.div>
          )}
        </div>

        {/* ITEM DESCRIPTION */}
        <p style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-primary)', margin: '30px 0', textAlign: 'center' }}>
          {items[index].text}
        </p>

        {/* BIG ACTION BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => choose("clean")}
            style={{ 
              padding: '25px', 
              borderRadius: '25px', 
              border: '4px solid #00b894', 
              background: 'rgba(0, 184, 148, 0.1)', 
              color: '#00b894', 
              fontWeight: '900', 
              fontSize: '1.6rem',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 184, 148, 0.2)'
            }}
          >
            ✨ Clean (C)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => choose("messy")}
            style={{ 
              padding: '25px', 
              borderRadius: '25px', 
              border: '4px solid #ff7675', 
              background: 'rgba(255, 118, 117, 0.1)', 
              color: '#ff7675', 
              fontWeight: '900', 
              fontSize: '1.6rem',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(255, 118, 117, 0.2)'
            }}
          >
            🌪️ Messy (M)
          </motion.button>
        </div>

        {/* PROGRESS & STATS */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          padding: '20px 40px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '50px', 
          border: '2px solid var(--border-color)',
          fontWeight: '900',
          fontSize: '1.2rem'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>Question {index + 1} of {totalQuestions}</span>
          <span style={{ color: '#00b894' }}>✅ {correct}</span>
          <span style={{ color: '#ff7675' }}>❌ {wrong}</span>
        </div>

        <div style={{ marginTop: '40px' }}>
          <button className="secondary-btn" onClick={captureScreen} style={{ padding: '15px 35px', borderRadius: '50px', fontWeight: '900', letterSpacing: '1px' }}>
            📸 Save Progress Screenshot
          </button>
        </div>

      </div>
    </div>
  );
}

export default Game;