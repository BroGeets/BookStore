import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./CarouselStyle.css";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
// import {Book} from "./Book";
import { useNavigate } from "react-router-dom";

function Books() {
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

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-prev-arrow" onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-next-arrow" onClick={onClick}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div
      // style={{ maxWidth: "800px" }}
      className="container">
      <Slider {...settings}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{ width: "50px" }}
            className="mx-3 my-3 carosel-item"
            height="300px">
            <img
              src={event.cover}
              alt={event.title}
              onClick={() => handleBookClick(event.id)}
              className="item mx-0"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Books;
