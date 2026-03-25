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
import AboutMoney from "./lab2/AboutMoney";

/* ===== Activity CRUD Form ===== */
import ActivityForm from "./ActivityForm";

/* ===== Login ===== */
import Login from "./Login";
import Dashboard from "./Dashboard";

import { AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper";
import FloatingBubbles from "./FloatingBubbles";
import { useThemeContext } from "./ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react";

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

  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={`app-shell ${theme}`}>
      {page !== "login" && <FloatingBubbles />}
      {/* GLOBAL APP BAR */}
      <div className="top-app-bar">
        <div className="logo-section">
          <h2>🎯 Autism Learning Portal</h2>
        </div>
        <div className="actions-section">
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {isLoggedIn && (
            <button
              className="icon-btn logout"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setPage("login");
              }}
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="app-content">
        <AnimatePresence mode="wait">
          {page === "login" && (
            <PageWrapper key="login">
              <Login onLoginSuccess={handleLoginSuccess} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "dashboard" && (
            <PageWrapper key="dashboard">
              <Dashboard setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "activity" && (
            <PageWrapper key="activity">
              <ActivityForm setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "home" && (
            <PageWrapper key="home">
              <Home setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "learn" && (
            <PageWrapper key="learn">
              <Learn setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "game" && (
            <PageWrapper key="game">
              <Game setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "result" && (
            <PageWrapper key="result">
              <Result resultData={pageData} setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "habit" && (
            <PageWrapper key="habit">
              <HabitForm setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "about" && (
            <PageWrapper key="about">
              <AboutHabits setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "money" && (
            <PageWrapper key="money">
              <MoneyHome setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "challenge" && (
            <PageWrapper key="challenge">
              <Challenge setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "moneyResult" && (
            <PageWrapper key="moneyResult">
              <Progress resultData={pageData} setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "product" && (
            <PageWrapper key="product">
              <ProductDetails setPage={navigateTo} />
            </PageWrapper>
          )}

          {isLoggedIn && page === "aboutMoney" && (
            <PageWrapper key="aboutMoney">
              <AboutMoney setPage={navigateTo} />
            </PageWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;