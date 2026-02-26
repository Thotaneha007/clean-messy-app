import welcomeImg from "./assets/images/welcome_room.png";

function Home({ setPage }) {
  return (
    <div className="container">
      <div className="card">

        {/* BACK BUTTON */}
        <div className="top-nav">
          <button
            className="back-btn"
            onClick={() => setPage("dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* HEADER */}
        <h1>Clean or Messy</h1>
        <p className="subtitle">
          Let’s learn how to keep our room clean
        </p>

        {/* IMAGE */}
        <img
          src={welcomeImg}
          alt="clean room illustration"
          className="item-image"
        />

        {/* PURPOSE */}
        <p className="item-text">
          This activity helps children understand the difference between
          clean and messy situations using simple pictures.
        </p>

        

        {/* PRIMARY ACTIONS */}
        <div className="buttons">
          <button
            className="primary-btn"
            onClick={() => setPage("learn")}
          >
            Learn First
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("game")}
          >
            Start Activity
          </button>
        </div>

        {/* CALM NOTE */}
        <p className="calm-text">
          Take your time. There is no hurry.
        </p>

        {/* SECONDARY ACTIONS */}
        <div className="extension-box">
          <p className="subtitle">For parents & teachers</p>

          <button
            className="primary-btn action-btn"
            onClick={() => setPage("habit")}
          >
            Daily Habit Form
          </button>

          <button
            className="secondary-btn action-btn"
            onClick={() => setPage("about")}
          >
            About Clean Habits
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;
