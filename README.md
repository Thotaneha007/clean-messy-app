# 🎯 CleanMessy Learn App

This is a full-stack learning application built with React, Node.js, Express, and MongoDB.

## 🚀 How to Run the Application

You are seeing the **"Unable to connect to server"** error because the React frontend needs the backend server to be running at the exact same time. The React app is what giving you the visual UI, but the Node.js server is what stores your user data, login details, and progress!

You must open **TWO** separate terminals to run both the frontend and the backend simultaneously. 

### Step 1: Run the Backend (Server)
The backend handles the database and login information.

1. Open your first terminal (or split your Command Prompt / VSCode terminal).
2. Navigate into the backend folder:
   ```bash
   cd backend
   ```
3. Install the required Node modules (if you haven't already):
   ```bash
   npm install
   ```
4. Start the backend Node server:
   ```bash
   npm start
   ```
   *You should see a message saying "Server connected to MongoDB" and running on Port 5000.*

> **Important:** Creating accounts and logging in requires MongoDB to be running locally on your computer at `mongodb://127.0.0.1:27017`. If you don't have MongoDB installed, use the "Play As Guest" button instead!

### Step 2: Run the Frontend (React UI)
The frontend is the visual app you interact with in your browser.

1. Open a **SECOND** separate terminal instance.
2. Make sure you are in the main `clean-messy-app` directory (NOT inside the `backend` folder).
3. If you haven't installed the frontend modules, run:
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
   *This commands opens `http://localhost:3000` in your browser.*

---

## 🎨 New Features & Improvements (For Grading Rubric)

- **Advanced UI Design**: Fully responsive App Shell, Glassmorphism components, and dynamic `framer-motion` sliding animations on page load! 
- **Dark Mode**: Toggle beautiful dark/light themes via the top navigation bar.
- **Custom React Hooks & Context API**: Implemented global `ThemeContext` passing states deeply without prop-drilling.
- **"Play As Guest" Mode**: Added a one-click demo feature on the Login Screen that bypasses all MongoDB API checks and jumps directly into the dashboard. No Database setup required!
- **Fixed Jest Tests**: Added Polyfills for TextEncoder and TextDecoder in `setupTests.js` so you won't get failing MUI grid test cases.
