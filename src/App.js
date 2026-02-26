import { useState, useEffect } from "react";
import "./App.css";

/* ===== Clean & Messy Module ===== */
import Home from "./Home";
import Learn from "./Learn";
import Game from "./Game";
import Result from "./Result";
import HabitForm from "./HabitForm";
import AboutHabits from "./AboutHabits";

/* ===== Money Module ===== */
import MoneyHome from "./lab2/MoneyHome";
import Challenge from "./lab2/Challenge";
import Progress from "./lab2/Progress";
import ProductDetails from "./lab2/ProductDetails";

/* ===== Activity CRUD Form ===== */
import ActivityForm from "./ActivityForm";

/* ===== Login ===== */
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("login");
  const [pageData, setPageData] = useState(null); // 🔥 ADD THIS

  /* ================= CHECK TOKEN ON LOAD ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setPage("dashboard");
    }
  }, []);

  /* ================= NAVIGATION HANDLER ================= */
  function navigateTo(nextPage, data = null) {
    if (!isLoggedIn && nextPage !== "login") return;
    setPage(nextPage);
    setPageData(data); // 🔥 STORE RESULT DATA
  }

  /* ================= LOGIN SUCCESS ================= */
  function handleLoginSuccess() {
    setIsLoggedIn(true);
    setPage("dashboard");
  }

  return (
    <>
      {/* LOGIN */}
      {page === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {/* DASHBOARD */}
      {isLoggedIn && page === "dashboard" && (
        <Dashboard setPage={navigateTo} />
      )}

      {/* ACTIVITY FORM */}
      {isLoggedIn && page === "activity" && (
        <ActivityForm setPage={navigateTo} />
      )}

      {/* CLEAN & MESSY */}
      {isLoggedIn && page === "home" && (
        <Home setPage={navigateTo} />
      )}

      {isLoggedIn && page === "learn" && (
        <Learn setPage={navigateTo} />
      )}

      {isLoggedIn && page === "game" && (
        <Game setPage={navigateTo} />
      )}

      {isLoggedIn && page === "result" && (
        <Result resultData={pageData} setPage={navigateTo} />
      )}

      {isLoggedIn && page === "habit" && (
        <HabitForm setPage={navigateTo} />
      )}

      {isLoggedIn && page === "about" && (
        <AboutHabits setPage={navigateTo} />
      )}

      {/* MONEY */}
      {isLoggedIn && page === "money" && (
        <MoneyHome setPage={navigateTo} />
      )}

      {isLoggedIn && page === "challenge" && (
        <Challenge setPage={navigateTo} />
      )}

      {isLoggedIn && page === "moneyResult" && (
        <Progress resultData={pageData} setPage={navigateTo} />
      )}

      {/* PRODUCT */}
      {isLoggedIn && page === "product" && (
        <ProductDetails setPage={navigateTo} />
      )}
    </>
  );
}

export default App;