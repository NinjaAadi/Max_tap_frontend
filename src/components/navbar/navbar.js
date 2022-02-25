import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isActive, setisActive] = useState(false);

  return (
    <nav
      className="navbar has-shadow is-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="https://www.maxtap.net/index.html" className="navbar-item">
          <p class="title is-3  is-family-monospace">Maxtap</p>
        </a>

        <div
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <NavLink to="/showallads" className="navbar-item">
              Ads
            </NavLink>
            <NavLink to="/category/viewallcategory" className="navbar-item">
              Category
            </NavLink>
            <NavLink to="/advertiser/viewalladvertiser" className="navbar-item">
              Advetiser
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
