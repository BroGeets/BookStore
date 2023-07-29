import React from "react";

function Navbar() {
  return (
    <div style={{ backgroundColor: "#f5f4eb" }}>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary py-0"
        style={{ backgroundColor: "#f5f4eb" }}>
        <div className="container-fluid" style={{ backgroundColor: "#f5f4eb" }}>
          <a className="navbar-brand" href="#">
            <img
              src="/images/logo-no-background-cropped.png"
              alt="Logo"
              height="45"
              width="200"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a className="nav-link" href="./explore">
                Explore
              </a>
              <a className="nav-link" href="./addbook">
                Add Books
              </a>
              <a className="nav-link" href="./library">
                Library
              </a>
              <a className="nav-link" href="./writechapter">
                Add Chapter
              </a>
            </div>
            <div>
              <a className="nav-link" href="./signin">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
