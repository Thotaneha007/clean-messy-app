import { useState } from "react";
import "./App.css";

/* Import all page components */
import Home from "./Home";
import Learn from "./Learn";
import Game from "./Game";
import Result from "./Result";
import HabitForm from "./HabitForm";     // Form-based extension
import AboutHabits from "./AboutHabits"; // Class component

function App() {
  // Controls which page is currently visible
  const [page, setPage] = useState("home");

  // Stores stars earned in the game
  const [score, setScore] = useState(0);

  // Central navigation handler (cleaner logic)
  function navigateTo(nextPage) {
    // Reset score when starting a new game
    if (nextPage === "game") {
      setScore(0);
    }
    setPage(nextPage);
  }

  return (
    <>
      {page === "home" && <Home setPage={navigateTo} />}

      {page === "learn" && <Learn setPage={navigateTo} />}

      {page === "game" && (
        <Game setPage={navigateTo} setScore={setScore} />
      )}

      {page === "result" && (
        <Result score={score} setPage={navigateTo} />
      )}

      {/* Extension pages */}
      {page === "habit" && <HabitForm setPage={navigateTo} />}

      {page === "about" && <AboutHabits setPage={navigateTo} />}
    </>
  );
}

export default App;
