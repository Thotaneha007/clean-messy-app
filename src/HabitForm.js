import { useState } from "react";

function HabitForm({ setPage }) {
  const [name, setName] = useState("");
  const [roomClean, setRoomClean] = useState(false);
  const [toysOrganized, setToysOrganized] = useState(false);
  const [handsWashed, setHandsWashed] = useState(false);
  const [cleanLevel, setCleanLevel] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Daily clean habits recorded successfully.");
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Daily Clean Habit Tracker</h2>

        <p className="item-text">
          This form helps parents or teachers record clean habits practiced
          by the child in daily life.
        </p>

        <form onSubmit={handleSubmit}>
          {/* CHILD DETAILS */}
          <div className="section-box">
            <div className="section-title">👧 Child Details</div>

            <label>
              Child Name:
              <input
                type="text"
                placeholder="Enter child name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          {/* CLEAN HABITS */}
          <div className="section-box">
            <div className="section-title">🧹 Clean habits completed</div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={roomClean}
                  onChange={() => setRoomClean(!roomClean)}
                />
                Room cleaned
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={toysOrganized}
                  onChange={() => setToysOrganized(!toysOrganized)}
                />
                Toys kept properly
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={handsWashed}
                  onChange={() => setHandsWashed(!handsWashed)}
                />
                Hands washed before meals
              </label>
            </div>
          </div>

          {/* TIME OF PRACTICE */}
          <div className="section-box">
            <div className="section-title">⏰ When was this practiced?</div>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="Morning"
                  onChange={(e) => setTimeOfDay(e.target.value)}
                />
                Morning
              </label>

              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="Afternoon"
                  onChange={(e) => setTimeOfDay(e.target.value)}
                />
                Afternoon
              </label>

              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="Evening"
                  onChange={(e) => setTimeOfDay(e.target.value)}
                />
                Evening
              </label>
            </div>
          </div>

          {/* OVERALL CLEANLINESS */}
          <div className="section-box">
            <div className="section-title">⭐ Overall cleanliness today</div>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="cleanLevel"
                  value="Very Clean"
                  onChange={(e) => setCleanLevel(e.target.value)}
                />
                Very Clean
              </label>

              <label>
                <input
                  type="radio"
                  name="cleanLevel"
                  value="Okay"
                  onChange={(e) => setCleanLevel(e.target.value)}
                />
                Okay
              </label>

              <label>
                <input
                  type="radio"
                  name="cleanLevel"
                  value="Needs Practice"
                  onChange={(e) => setCleanLevel(e.target.value)}
                />
                Needs Practice
              </label>
            </div>
          </div>

          {/* NOTES */}
          <div className="section-box">
            <div className="section-title">📝 Notes (optional)</div>

            <textarea
              placeholder="Any observations today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="clean-btn action-btn"
            disabled={name.trim() === ""}
          >
            Save Daily Record
          </button>
        </form>

        {/* CONFIRMATION MESSAGE */}
        {message && (
          <div className="message">
            <p>{message}</p>
            <p>
              <strong>Cleanliness Level:</strong>{" "}
              {cleanLevel || "Not selected"}
            </p>
            <p>
              <strong>Time of Practice:</strong>{" "}
              {timeOfDay || "Not selected"}
            </p>
          </div>
        )}

        <button
          className="messy-btn action-btn"
          onClick={() => setPage("home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default HabitForm;
