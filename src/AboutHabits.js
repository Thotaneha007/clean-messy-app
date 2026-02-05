import React, { Component } from "react";

class AboutHabits extends Component {
  render() {
    return (
      <div className="container">
        <div className="card">
          <h2>About Clean Habits</h2>

          <p className="item-text">
            Clean habits help children feel safe, calm, and confident in their
            daily environment.
          </p>

          {/* WHY IT MATTERS */}
          <div className="section-box">
            <div className="section-title">🌱 Why clean habits matter</div>
            <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
              <li>Helps children feel calm and organized</li>
              <li>Reduces sensory overload and confusion</li>
              <li>Encourages independence and routine</li>
            </ul>
          </div>

          {/* HOW THE APP HELPS */}
          <div className="section-box">
            <div className="section-title">🧠 How this activity helps</div>
            <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
              <li>Uses visual learning instead of long text</li>
              <li>Gives positive and gentle feedback</li>
              <li>Allows learning without pressure or time limits</li>
            </ul>
          </div>

          {/* WHO CAN USE */}
          <div className="section-box">
            <div className="section-title">👨‍👩‍👧 Who can use this application</div>
            <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
              <li>Children with Autism Spectrum Disorder</li>
              <li>Parents and caregivers</li>
              <li>Teachers and therapists</li>
            </ul>
          </div>

          {/* CONNECTION TO GAME */}
          <p className="item-text">
            The sorting game and habit tracker work together to help children
            learn clean habits and practice them in real life.
          </p>

          {/* CLOSING MESSAGE */}
          <p className="calm-text">
            🌱 Learning happens step by step. Take your time.
          </p>

          <button
            className="clean-btn action-btn"
            onClick={() => this.props.setPage("home")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }
}

export default AboutHabits;
