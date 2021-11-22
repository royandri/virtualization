import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="app-name"> 
        Notflix
      </div>

      <div className="app-menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li><a href="/">TV Shows</a></li>
          <li><a href="/">Movies</a></li>
          <li><a href="/">Latest</a></li>
          <li><a href="/">My List</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default React.memo(Navbar);