import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsTable from "./components/ReportsTable";
import PatientTable from "./components/PatientTable";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        <header style={{ textAlign: "right", padding: "10px" }}>
          {localStorage.getItem("token") && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ReportsTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PrivateRoute>
                <PatientTable />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
