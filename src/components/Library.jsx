import React from "react";
import { useState, useEffect } from "react";
import { db, storage } from "../config/firebase";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import "./CarouselStyle.css";

function Library() {
  const [events, setEvents] = useState([]);
  const [uid, setUid] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = doc(collection(db, "Carts", uid));
        const docSnapshot = await getDoc(querySnapshot);
        if (docSnapshot.exists()) {
          const cartData = docSnapshot.data();
          const booksList = cartData.LibraryBooks;
          // booksList contains the ids of Books while books maps entire book objects, so I have to add something to fetcht the object Books by id
          const books = booksList.docs.map((doc) => {
            const bookData = doc.data();
            return {
              id: doc.id,
              title: bookData.Title,
              cover: bookData.Cover,
            };
          });
          setEvents(books);
        }
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
    </div>
  );
}

export default Library;
