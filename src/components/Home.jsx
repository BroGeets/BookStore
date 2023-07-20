import React from "react";
import Explore from "./Explore";
import "./HomeStyle.css";
import AddBook from "./AddBook";
import SignIn from "./SignIn";

function Home() {
  return (
    <div className="hero">
      {/* <SignIn /> */}
      {/* <AddBook /> */}
      <div className="card text-bg-light border-0">
        <img
          src="/images/bg.jpg"
          className="card-img"
          alt="Background"
          height="600px"
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center ">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder mb-0">
              NEW SEASON ARRIVALS
            </h5>
            <p className="card-text lead fs-2">CHECK IT OUT</p>
          </div>
        </div>
      </div>
      <Explore />
    </div>
  );
}

export default Home;
