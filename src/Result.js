function Result({ setPage }) {
  return (
    <div className="container">
      <div className="card result-card">
        {/* Header */}
        <div className="result-header">
          <span className="result-icon">✅</span>
          <h2>Activity Completed</h2>
        </div>

        <p className="item-text">
          You completed today’s clean and messy activity.
        </p>

        {/* Feedback box */}
        <div className="result-feedback">
          🌟 Great effort! You practiced identifying clean habits.
        </div>

        <p className="calm-text">
          Keeping things clean helps us feel calm, safe, and happy.
        </p>

        <p className="calm-text">
          You can stop here for today or practice again if you feel comfortable.
        </p>

        {/* Actions */}
        <div className="buttons">
          <button
            className="clean-btn"
            onClick={() => setPage("game")}
          >
            Practice Again
          </button>

          <button
            className="messy-btn"
            onClick={() => setPage("home")}
          >
            Go to Home
          </button>
        </div>

        {/* Closure */}
        <p className="result-footer">
          🌱 Thank you for learning today.
        </p>
      </div>
    </div>
  );
}

export default Result;
