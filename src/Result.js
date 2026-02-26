function Result({ setPage, resultData }) {

  if (!resultData) {
    return (
      <div className="container">
        <div className="card">
          <p>No session data available.</p>
          <button
            className="secondary-btn"
            onClick={() => setPage("home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { correct, wrong, totalQuestions, accuracy } = resultData;

  /* ================= STAR CALCULATION ================= */
  let stars = 1;

  if (accuracy >= 90) stars = 3;
  else if (accuracy >= 60) stars = 2;

  /* ================= PERFORMANCE LEVEL ================= */
  let level = "Beginner";
  if (accuracy >= 90) level = "Excellent";
  else if (accuracy >= 70) level = "Improving";
  else if (accuracy >= 50) level = "Developing";

  /* ================= ENCOURAGEMENT MESSAGE ================= */
  let message = "Great effort! Keep practicing.";

  if (accuracy === 100) {
    message = "Amazing! You identified everything correctly!";
  } else if (accuracy >= 75) {
    message = "Very good work! You are improving steadily.";
  } else if (accuracy >= 50) {
    message = "Nice try! Learning happens step by step.";
  } else {
    message = "That’s okay. Practice helps us grow stronger.";
  }

  return (
    <div className="container">
      <div className="card result-card">

        {/* HEADER */}
        <div className="result-header">
          <span className="result-icon">🎉</span>
          <h2>Session Completed</h2>
        </div>

        {/* SESSION SUMMARY */}
        <div className="achievement-box">
          <h3>Today’s Performance</h3>
          <p>Total Questions: {totalQuestions}</p>
          <p>Correct Answers: {correct}</p>
          <p>Wrong Answers: {wrong}</p>
          <p><strong>Accuracy: {accuracy}%</strong></p>
          <p><strong>Level: {level}</strong></p>
        </div>

        {/* STAR DISPLAY */}
        <div style={{ fontSize: "30px", margin: "15px 0" }}>
          {"⭐".repeat(stars)}
        </div>

        {/* PROGRESS BAR VISUAL */}
        <div className="progress-wrapper" style={{ marginBottom: "15px" }}>
          <div
            className="progress-fill"
            style={{ width: `${accuracy}%` }}
          />
        </div>

        {/* ENCOURAGEMENT */}
        <div className="result-feedback">
          {message}
        </div>

        <p className="calm-text">
          Practicing daily helps build confidence and calm thinking.
        </p>

        {/* ACTION BUTTONS */}
        <div className="buttons">
          <button
            className="clean-btn"
            onClick={() => setPage("game")}
          >
            Practice Again
          </button>

          <button
            className="messy-btn"
            onClick={() => setPage("dashboard")}
          >
            Go to Dashboard
          </button>
        </div>

        <p className="result-footer">
          Thank you for learning today.
        </p>

      </div>
    </div>
  );
}

export default Result;