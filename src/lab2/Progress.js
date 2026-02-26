function Progress({ setPage, resultData }) {

  if (!resultData) {
    return (
      <div className="container">
        <div className="card">
          <p>No session data available.</p>
          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
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

  /* ================= ENCOURAGEMENT ================= */
  let message = "Great effort! Keep practicing.";

  if (accuracy === 100) {
    message = "Fantastic! You calculated everything correctly!";
  } else if (accuracy >= 75) {
    message = "Very good work! Your money skills are improving.";
  } else if (accuracy >= 50) {
    message = "Nice try! Keep practicing coin combinations.";
  } else {
    message = "That’s okay. Learning takes practice.";
  }

  return (
    <div className="container">
      <div className="card result-card">

        {/* HEADER */}
        <div className="result-header">
          <span className="result-icon">💰</span>
          <h2>Money Challenge Completed</h2>
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

        {/* PROGRESS BAR */}
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
          Practicing money skills helps build independence.
        </p>

        {/* BUTTONS */}
        <div className="buttons">
          <button
            className="primary-btn"
            onClick={() => setPage("challenge")}
          >
            Practice Again
          </button>

          <button
            className="secondary-btn"
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

export default Progress;