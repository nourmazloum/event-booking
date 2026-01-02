import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import "./Navbar.css";

function Navbar({ theme = "light", toggleTheme }) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleDocClick(e) {
      const container = document.getElementById("nav-links");
      if (container && !container.contains(e.target)) {
        const panel = document.getElementById("more-info-panel");
        const btn = document.getElementById("more-info-toggle");
        if (panel && panel.classList.contains("open")) {
          panel.classList.remove("open");
          if (btn) btn.setAttribute("aria-expanded", "false");
          panel.setAttribute("aria-hidden", "true");
        }
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  function togglePanel() {
    const panel = document.getElementById("more-info-panel");
    const btn = document.getElementById("more-info-toggle");
    if (!panel) return;
    const nowOpen = panel.classList.toggle("open");
    if (btn) btn.setAttribute("aria-expanded", nowOpen ? "true" : "false");
    panel.setAttribute("aria-hidden", nowOpen ? "false" : "true");
  }

  // 🔴 LOGOUT HANDLER
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="nav">
      <h2 className="logo">Event Booking</h2>

      <div id="nav-links" className="links">
        {isLoggedIn() && (
          <>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/my-bookings">My Bookings</Link>
            {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          </>
        )}

        {!isLoggedIn() && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}

        {isLoggedIn() && (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        <button
          id="more-info-toggle"
          className="info-toggle"
          onClick={togglePanel}
          aria-expanded="false"
          aria-controls="more-info-panel"
          title="More Info"
        >
          More Info
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div id="more-info-panel" className="info-panel" role="dialog" aria-hidden="true">
          <div className="info-inner">
            <h4>Contact</h4>
            <p>
              Email: <a href="mailto:eventsbooking@gmail.com">eventsbooking@gmail.com</a>
            </p>
            <p>
              Phone: <a href="tel:+96170222356">+961 70 222356</a>
            </p>

            <h4>Social</h4>
            <p>
              Instagram:{" "}
              <a
                href="https://instagram.com/eventsbooking.lb"
                target="_blank"
                rel="noreferrer"
              >
                @eventsbooking.lb
              </a>
            </p>
            <p>
              Facebook:{" "}
              <a
                href="https://facebook.com/eventsbooking"
                target="_blank"
                rel="noreferrer"
              >
                events booking
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
