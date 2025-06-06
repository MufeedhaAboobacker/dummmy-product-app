import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav
      className="navbar navbar-expand-lg px-4 shadow-sm"
      style={{ backgroundColor: "#8e99a8" }}
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
          style={{ fontFamily: "arial", color: "#ffffff" }}
        >
          Product App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex align-items-center gap-2">
            <li>
              <Link
                to="/"
                className="btn fw-semibold"
                style={{
                  fontSize: "1.1rem",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
              >
                Product List
              </Link>
            </li>
            <li>
              <Link
                to="/add-product"
                className="btn fw-semibold"
                style={{
                  fontSize: "1.1rem",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
              >
                Add Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
