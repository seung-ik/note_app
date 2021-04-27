import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const Nav = ({ setIsLogin }) => {
  const logoutSubmit = useCallback(() => {
    localStorage.clear();
    setIsLogin(false);
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <h1>
            <Link to="/">seung-ik</Link>
          </h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Note</Link>
          </li>
          <li onClick={logoutSubmit}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Nav;
