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

        await saveSession(finalCorrect, finalWrong);

        const accuracy = Math.round(
          (finalCorrect / totalQuestions) * 100
        );

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
    <div className="money-container">
      <div className="money-card" ref={cardRef}>

        <h2>Money Challenge</h2>

        <p>Question {questionCount} / {totalQuestions}</p>

        <div className="target-box">
          Make ₹{target}
        </div>

        <div className="total-box">
          Current Total: ₹{total}
        </div>

        <div className="coin-grid">
          <div className="coin" onClick={() => addCoin(1)}>₹1</div>
          <div className="coin" onClick={() => addCoin(2)}>₹2</div>
          <div className="coin" onClick={() => addCoin(5)}>₹5</div>
          <div className="coin" onClick={() => addCoin(10)}>₹10</div>
        </div>

        <div className="action-row">
          <button className="primary-btn" onClick={checkAnswer}>
            Check (Enter)
          </button>

          <button className="secondary-btn" onClick={resetTotal}>
            Reset (R)
          </button>
        </div>

        {feedback === "correct" && (
          <div className="success-box">
            ✅ Correct!
          </div>
        )}

        {feedback === "wrong" && (
          <div className="error-box">
            ❌ That’s okay. Try the next one.
          </div>
        )}

        <p style={{ marginTop: "10px" }}>
          Correct: {correct} | Wrong: {wrong}
        </p>

        <div className="action-row">
          <button className="secondary-btn" onClick={captureScreen}>
            📸 Capture Screen
          </button>
        </div>

        <div className="center-btn">
          <button
            className="back-btn"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default Challenge;