import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/videogame">Video Games</Link>
          </li>
          <li>
            <Link to="/movie">Movies</Link>
          </li>
          <li>
            <Link to="/kickstarter">Kickstarters</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
