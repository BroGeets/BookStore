import React from "react";

function Footer() {
  return (
    <div style={{ background: "#f5f4eb" }}>
      <footer className="w-100 py-4 flex-shrink-0">
        <div className="container py-4">
          <div className="row gy-4 gx-5">
            <div className="col">
              <h5 className="h1 text-dark">BookTown</h5>
              <p className="small text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <p className="small text-muted mb-0">
                &copy; Copyrights. All rights reserved.{" "}
              </p>
            </div>
            <div className="col">
              <h5 className="text-dark mb-3">Quick links</h5>
              <ul className="list-unstyled text-muted">
                <li>
                  <a href="#" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
