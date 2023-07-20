import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { db, auth, storage } from "../config/firebase";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cartId, setCartId] = useState("");

  const uid = auth?.currentUser.uid;

  const findCart = async () => {
    try {
      const cartQuerySnapshot = await getDocs(
        query(collection(db, "Carts"), where("AuthorID", "==", uid))
      );
      const cartId = cartQuerySnapshot.data();
      console.log(cartId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const bookRef = collection(db, "Books");
        const bookSnapshot = await getDoc(doc(bookRef, id));
        // console.log(bookSnapshot);
        console.log(bookSnapshot.data());
        if (bookSnapshot.exists()) {
          setBook(bookSnapshot.data());
        } else {
          console.log("Book not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book Not Found</p>;
  }

  const ShowBook = () => {
    return (
      <>
        <div className="col-md-6">
          <img src={book.Cover} alt="Image" height="400px" />
        </div>
        <div className="col-md-6">
          {/* <h4 className="text-uppercase textblack-50">{book.category}</h4> */}
          <h1 className="display-5">{book.Title}</h1>
          {/* <p className="lead fw-bolder">
          Rating {book.rating && book.rating.rate}
          <i className="fa fa-star"></i>
        </p> */}
          {/* <h3 className="display-6 fw-bold my-4">${book.price}</h3> */}
          <p className="lead">{book.Description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => handleAddBook()}>
            {" "}
            Add To Library
          </button>
          {/* <NavLink to="/cart" className="btn btn-dark ms-2 px-4 py-2">
          {" "}
          Go To Cart
        </NavLink> */}
        </div>
      </>
    );
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">{/* <Skeleton height="400px" /> */}</div>
        <div className="col-md-6">
          {/* <Skeleton height={50} width={300} /> */}
        </div>
      </>
    );
  };

  const handleAddBook = async () => {
    try {
      const libraryBooksRef = collection(
        doc(db, "Carts", cartId),
        "LibraryBooks"
      );
      await addDoc(libraryBooksRef, {
        BookId: id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   // const newCollectionId = newCollectionRef.id;
  //   const subcollectionRef = collection(
  //     db,
  //     "Carts",
  //     newCollectionId,
  //     "LibraryBooks"
  //   );

  //   const add = async () => {
  //     await addDoc(subcollectionRef, {
  //       // Your subcollection document data goes here
  //       BookID: book.id,
  //     });
  //   };
  //   add();
  // });

  return (
    <div style={{ background: "#f5f4eb" }}>
      <div className="container px-5 py-5">
        <div className="row">{loading ? <Loading /> : <ShowBook />}</div>
      </div>
    </div>
  );
}

export default Book;
