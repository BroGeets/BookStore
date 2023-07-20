import React from "react";
import Carousel from "./Carousel";

function Explore() {
  return (
    <div>
      <div className="container-sm fit">
        <h2>Trending Books</h2>
        <Carousel />
      </div>
      <div className="container-sm fit">
        <h2>Special Offers</h2>
        <Carousel />
      </div>
      <div className="container-sm fit">
        <h2>Upcoming Books</h2>
        <Carousel />
      </div>
    </div>
  );
}

export default Explore;
