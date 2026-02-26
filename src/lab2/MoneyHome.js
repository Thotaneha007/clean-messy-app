function MoneyHome({ setPage }) {
  return (
    <div className="container">
      <div className="card">

        <h2>Money Learning</h2>

        <p className="subtitle">
          Learn to recognize coins and understand their values.
        </p>

        {/* Learning Section */}
        <div className="section-box">

          <div className="section-title">
             Indian Coins
          </div>

          <div className="coin-row">

            <div className="coin">
              ₹1
            </div>

            <div className="coin">
              ₹2
            </div>

            <div className="coin">
              ₹5
            </div>

            <div className="coin">
              ₹10
            </div>

          </div>

          <p className="calm-text">
            Each coin has a different value.  
            We can combine coins to make a total amount.
          </p>

        </div>

        {/* What We Will Practice */}
        <div className="section-box">
          <div className="section-title">
             What you will practice
          </div>

          <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
            <li>Recognizing coin values</li>
            <li>Adding coin amounts</li>
            <li>Finding total money</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="buttons">

          <button
            className="primary-btn"
            onClick={() => setPage("challenge")}
          >
            Start Challenge
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default MoneyHome;
