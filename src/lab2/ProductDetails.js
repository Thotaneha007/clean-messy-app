function ProductDetails({ setPage }) {
  return (
    <div className="container">
      <div className="card product-card">

        <h2>Autism Learning Portal</h2>
        <p className="subtitle">
          A Structured Visual Learning System for Autism Support
        </p>

        {/* ================= MEMBER DETAILS ================= */}
        <div className="section-box">
          <h3>Member Details</h3>
          <p><strong>Name:</strong> Thota Neha</p>
          <p><strong>Roll No:</strong> CB.SC.U4CSE23165</p>
          <p><strong>Course Code:</strong> 23CSE461</p>
          <p><strong>Course Name:</strong> FullStack Frameworks</p>
        </div>

        {/* ================= COURSE TEACHER ================= */}
        <div className="section-box">
          <h3>Course Teacher</h3>
          <p>Dr. T. Senthil Kumar</p>
          <p>Professor</p>
          <p>Amrita School of Computing</p>
          <p>Amrita Vishwa Vidyapeetham</p>
          <p>Coimbatore - 641112</p>
          <p>Email: t_senthilkumar@cb.amrita.edu</p>
        </div>

        {/* ================= PROJECT OVERVIEW ================= */}
        <div className="section-box">
          <h3>Project Overview</h3>
          <p>
            This portal is designed to improve structured and visual learning
            for children with Autism Spectrum Disorder (ASD). It combines
            visual sorting tasks and money-based mathematical exercises
            using calm design principles and repetition-based interaction.
          </p>
        </div>

        {/* ================= MODULES ================= */}
        <div className="section-box">
          <h3>Modules Included</h3>
          <ul>
            <li>Clean & Messy Visual Sorting Activity</li>
            <li>Money Recognition & Addition Challenge</li>
            <li>User Login & Registration System</li>
            <li>Progress Tracking with Backend Integration</li>
          </ul>
        </div>

        {/* ================= TECHNOLOGY STACK ================= */}
        <div className="section-box">
          <h3>Technologies Used</h3>
          <ul>
            <li>React.js – Frontend UI & Component Design</li>
            <li>Node.js & Express.js – REST API Backend</li>
            <li>MongoDB – User & Progress Storage</li>
            <li>JWT – Secure Authentication</li>
            <li>Bcrypt – Password Encryption</li>
          </ul>
        </div>

        {/* ================= EDUCATIONAL IMPACT ================= */}
        <div className="section-box">
          <h3>Educational Importance</h3>
          <ul>
            <li>Improves visual association skills</li>
            <li>Enhances short-term memory retention</li>
            <li>Supports structured step-by-step thinking</li>
            <li>Encourages independent problem-solving</li>
            <li>Reduces anxiety through calm UI design</li>
          </ul>
        </div>

        {/* ================= BACKEND FEATURES ================= */}
        <div className="section-box">
          <h3>Backend Functionalities</h3>
          <ul>
            <li>User Registration & Secure Login</li>
            <li>Token-Based Authentication (JWT)</li>
            <li>Saving Clean & Messy Game Scores</li>
            <li>Saving Money Challenge Results</li>
            <li>Individual User Progress Tracking</li>
          </ul>
        </div>

        {/* ================= GITHUB ================= */}
        <div className="section-box">
          <h3>GitHub Repository</h3>
          <p>
            https://github.com/Thotaneha007/clean-messy-app
          </p>
        </div>

        {/* ================= COLLABORATORS ================= */}
        <div className="section-box">
          <h3>Collaborators</h3>
          <p><strong>Academic:</strong> None</p>
          <p><strong>Industry:</strong> None</p>
        </div>

        {/* ================= BACK BUTTON ================= */}
        <div className="center-btn">
          <button
            className="back-btn"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
