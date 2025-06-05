import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
   
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-success"
          style={{ fontFamily: "'arial'" }}
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
                className="btn btn-outline-success fw-semibold"
                style={{ fontSize: "1.2rem" }}
              >
                Product List
              </Link>
            </li>
            <li>
              <Link
                to="/add-product"
                className="btn btn-success fw-semibold"
                style={{ fontSize: "1.1rem" }}
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
