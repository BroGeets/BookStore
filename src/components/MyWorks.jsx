import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyWorks() {
  const [events, setEvents] = useState([]);
  const [uid, setUid] = useState("");

  const navigate = useNavigate();
  const handleAddBook = () => {
    navigate(`/addbook`);
  };

  return (
    <div style={{ background: "#f5f4eb", minHeight: "70vh" }}>
      <h1 className="mb-3 d-flex justify-content-center">My Works</h1>
      <div className="container-sm d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-light border-dark px-5 py-2"
          style={{ backgroundColor: "#e1ae80" }}
          onClick={handleAddBook}>
          Add Work
        </button>
      </div>
      <br />
      <h1 className="mb-3 d-flex justify-content-center">
        Continue Writing...
      </h1>
      <div className="container-sm d-flex flex-row justify-content-between align-content-start flex-wrap">
        {events.map((event) => (
          <div
            key={event.id}
            style={{ width: "50px" }}
            className="mx-3 my-3"
            height="300px">
            <img
              src={event.cover}
              alt={event.title}
              //   onClick={() => handleBookClick(event.id)}
              className="item mx-2 my-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyWorks;
