import cleanImg from "./assets/images/01_clean_room.jpg";
import messyImg from "./assets/images/02_messy_room.jpg";

function Learn({ setPage }) {
  return (
    <div className="container">
      <div className="card">
        {/* BACK BUTTON */}
        <div className="top-nav">
          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            ← Back to Activity Home
          </button>
        </div>

        <h2>Learn: Clean and Messy</h2>

        <p className="subtitle">
          Look at the pictures and understand the difference.
        </p>

        {/* Learning Images */}
        <div className="learn-grid">
          <div className="learn-item">
            <img
              src={cleanImg}
              alt="clean room"
              className="item-image"
            />
            <p className="item-text">
              🧼 Clean room<br />
              <span className="calm-text">
                Things are kept in place
              </span>
            </p>
          </div>

          <div className="learn-item">
            <img
              src={messyImg}
              alt="messy room"
              className="item-image"
            />
            <p className="item-text">
              🗑️ Messy room<br />
              <span className="calm-text">
                Things are scattered
              </span>
            </p>
          </div>
        </div>

        {/* Learning Tip */}
        <div className="section-box">
          <p className="calm-text">
            Clean rooms help us feel calm and safe.  
            Messy rooms can make us feel confused.
          </p>
        </div>

        {/* Navigation */}
        <button
          className="clean-btn action-btn"
          onClick={() => setPage("game")}
        >
          ▶ Start Activity
        </button>
      </div>
    </div>
  );
}

export default Learn;
