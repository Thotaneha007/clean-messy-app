import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

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

        <h2>Sorting Game</h2>

        <p className="subtitle">
          Press C for Clean | M for Messy
        </p>

        <img
          src={items[index].image}
          alt="sorting task"
          className="item-image"
        />

        <p className="item-text">
          {items[index].text}
        </p>

        <div className="buttons">
          <button
            className="clean-btn"
            onClick={() => choose("clean")}
          >
            Clean (C)
          </button>

          <button
            className="messy-btn"
            onClick={() => choose("messy")}
          >
            Messy (M)
          </button>
        </div>

        {message && <div className="result-feedback">{message}</div>}

        <p className="subtitle">
          Question {index + 1} of {totalQuestions}
        </p>

        <p className="calm-text">
          Correct: {correct} | Wrong: {wrong}
        </p>

        {loading && (
          <p className="calm-text">Saving session...</p>
        )}

        <div className="center-btn">
          <button className="secondary-btn" onClick={captureScreen}>
            📸 Capture Screen
          </button>
        </div>

      </div>
    </div>
  );
}

export default Game;