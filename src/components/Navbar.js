import React, { useEffect } from "react";
import { Link, useLocation} from "react-router-dom";

export default function Navbar(props) {
  let location = useLocation();
  useEffect(() => { }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    props.newAlert("success", "Logged Out Successfully");
  };
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-book mx-2"></i>
            Noteable
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/"
                      ? "active"
                      : ""
                    }`}
                  aria-current="page"
                  to="/"
                >
                  <i className="fa-solid fa-house mx-2"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about"
                      ? "active"
                      : ""
                    }`}
                  to="/about"
                >
                  <i className="fa-solid fa-circle-info mx-2"></i>
                  About
                </Link>
              </li>
            </ul>

            <div className="my-2 me-2">
              <label
                onClick={props.toggleMode}
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-circle-half-stroke mx-2"></i>
                {props.mode === "light" ? "Enable" : "Disable"}{" "}
                Dark Mode
              </label>
            </div>
            {!localStorage.getItem("token") ? (
              <div className="login-signup-btns">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  <i className="fa-solid fa-sign-in me-2"></i>
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  <i className="fa-solid fa-user-plus me-2"></i>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="user-name me-2">
                  <i className="fa-solid fa-user mx-2"></i>
                  Welcome, {localStorage.getItem("name")}
                </div>
                <div className="logout-btn">
                  <Link
                    className="btn btn-primary mx-2"
                    onClick={handleLogout}
                    to="/login"
                    role="button"
                  >
                    <i className="fa-solid fa-sign-out me-2"></i>
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
