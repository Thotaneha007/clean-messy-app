import { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FORM SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      setIsError(true);
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      if (isLogin) {
        /* ================= LOGIN ================= */
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );

        if (!res.data || !res.data.token) {
          throw new Error("Invalid server response");
        }

        // Store token
        localStorage.setItem("token", res.data.token);

        setIsError(false);
        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          onLoginSuccess();
        }, 800);

      } else {
        /* ================= REGISTER ================= */
        await axios.post(
          "http://localhost:5000/api/auth/register",
          { name, email, password }
        );

        setIsError(false);
        setMessage("Registration successful! Please login.");
        setIsLogin(true);

        // Clear fields
        setName("");
        setPassword("");
      }

    } catch (error) {
      setIsError(true);

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Unable to connect to server.");
      }
    }

    setLoading(false);
  }

  /* ================= UI ================= */
  return (
    <div className="container">
      <div className="card login-card">

        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        <p className="subtitle">
          {isLogin
            ? "Login to access the learning portal"
            : "Register to begin structured learning activities"}
        </p>

        <form onSubmit={handleSubmit} className="login-form">

          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/* ================= FEEDBACK ================= */}
        {message && (
          <div className={isError ? "error-message" : "success-message"}>
            {message}
          </div>
        )}

        {/* ================= SWITCH MODE ================= */}
        <div className="login-switch">
          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            className="secondary-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setIsError(false);
            }}
          >
            {isLogin ? "Register Here" : "Login Here"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;