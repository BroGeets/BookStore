import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import "./CarouselStyle.css";

function Library() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Books"));
        const books = querySnapshot.docs.map((doc) => {
          const bookData = doc.data();
          return {
            id: doc.id,
            title: bookData.Title,
            cover: bookData.Cover,
          };
        });
        setEvents(books);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div style={{ background: "#f5f4eb", height: "70vh" }}>
      <div className="container">
        <h1 className="mb-3 d-flex justify-content-center">
          Continue Reading...
        </h1>
        <div className="container-sm d-flex flex-row justify-content-around align-content-start flex-wrap">
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
    </div>
  );
}

export default Library;
