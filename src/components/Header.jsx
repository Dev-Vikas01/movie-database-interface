import React from 'react';
import { FaFilm, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ theme, toggleTheme }) => {

  return (
    <header className="header">

      <div className="logo">
        <FaFilm className="logo-icon" />
        <h1>MovieDB</h1>
      </div>

      <nav className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/favorites">
          Favorites
        </Link>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >

          {
            theme === 'dark'
              ? <FaSun />
              : <FaMoon />
          }

        </button>

      </nav>

    </header>
  );
};

export default Header;