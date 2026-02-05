import welcomeImg from "./assets/images/welcome_room.png";

function Home({ setPage }) {
  return (
    <div className="container">
      <div className="card">
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

        {/* WHAT WILL HAPPEN */}
        <div className="section-box">
          <div className="section-title">📘 What will happen here</div>
          <ul style={{ textAlign: "left", lineHeight: "1.6", margin: 0 }}>
            <li>Look at pictures and learn</li>
            <li>Play a clean or messy activity</li>
            <li>Practice good daily habits</li>
          </ul>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="buttons">
          <button
            className="clean-btn"
            onClick={() => setPage("learn")}
          >
            Learn First
          </button>

          <button
            className="messy-btn"
            onClick={() => setPage("game")}
          >
            Start Activity
          </button>
        </div>

        {/* CALM NOTE */}
        <p className="calm-text" style={{ marginTop: "16px" }}>
          🌱 Take your time. There is no hurry.
        </p>

        {/* SECONDARY ACTIONS */}
        <div className="extension-box">
          <p className="subtitle">For parents & teachers</p>

          <button
            className="clean-btn action-btn"
            onClick={() => setPage("habit")}
          >
            Daily Habit Form
          </button>

          <button
            className="messy-btn action-btn"
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
