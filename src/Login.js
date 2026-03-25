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
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card login-card" style={{ maxWidth: '450px', border: '1px solid rgba(255,255,255,0.3)', background: 'var(--card-bg)' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="subtitle">
            {isLogin
              ? "Login to access your learning portal"
              : "Register to begin your journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {!isLogin && (
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)' }}
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)' }}
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #4facfe, #00f2fe)', border: 'none', color: 'white', boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)' }}
          >
            {loading
              ? "Authenticating..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>


        {/* ================= GUEST ACCESS — SINGLE BUTTON ================= */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => {
              localStorage.setItem("token", "guest_token");
              onLoginSuccess();
            }}
            style={{ 
              padding: '12px', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1.5px solid var(--border-color)', 
              color: 'var(--text-primary)', 
              cursor: 'pointer', 
              fontSize: '1rem', 
              fontWeight: '600', 
              width: '100%',
              transition: 'all 0.3s ease'
            }}
          >
            Continue as Guest
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;