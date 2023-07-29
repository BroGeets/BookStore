import React, { useState, useEffect } from "react";
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

  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow custom-prev-arrow"
        onClick={onClick}
        style={{ zIndex: 1 }}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow custom-next-arrow"
        onClick={onClick}
        style={{ zIndex: 1 }}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    );
  };

  const responsiveSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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

   const settings = {
     ...responsiveSettings,
     slidesToShow: 4,
     responsive: [
       {
         breakpoint: 1200,
         settings: {
           slidesToShow: 4,
         },
       },
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 3,
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 3,
         },
       },
     ],
   };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {events.map((event) => (
          <div
            key={event.id}
            className="carousel-item mx-3 my-3 d-flex justify-content-center"
            style={{ zIndex: 0 }}>
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
