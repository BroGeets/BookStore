import React, { useState, useEffect } from "react";
import { auth, googleProvider, db, storage } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { addDoc, getDocs, query, where, collection } from "firebase/firestore";

function SignIn() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pwd);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const cartRef = collection(db, "Carts");
  const [uid, setUid] = useState(null);
  const [libBooks, setLibBooks] = useState([]);
  // const createCart = async () => {
  //   try {
  //     if (!uid) {
  //       console.log("User is not authenticated.");
  //       return;
  //     }
  //     const cartQuerySnapshot = await getDocs(
  //       query(collection(db, "Carts"), where("AuthorID", "==", uid))
  //     );
  //     if (cartQuerySnapshot.empty) {
  //       await addDoc(cartRef, {
  //         AuthorID: uid,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If the user is authenticated, set the uid
        setUid(user.uid);

        // Create the cart
        const createCart = async () => {
          try {
            const cartQuerySnapshot = await getDocs(
              query(collection(db, "Carts"), where("AuthorID", "==", user.uid))
            );
            if (cartQuerySnapshot.empty) {
              await addDoc(collection(db, "Carts"), {
                AuthorID: user.uid,
                LibraryBooks : libBooks,
              });
            }
          } catch (error) {
            console.log(error);
          }
        };

        createCart();
      } else {
        // If the user is not authenticated, set the uid to null
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   // Listen for changes in the user's authentication state
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // If the user is authenticated, set the uid
  //       setUid(user.uid);
  //       createCart();
  //     } else {
  //       // If the user is not authenticated, set the uid to null
  //       setUid(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     setUid(auth.currentUser.uid);
  //     createCart();
  //   }
  // }, [auth.currentUser]);

  return (
    <div style={{ background: "#f5f4eb" }}>
      <div
        className="container-sm display:block my-0 px-5 py-5 text-dark"
        style={{ maxWidth: "400px", backgroundColor: "#f5f4eb" }}>
        <h1 className="mb-3 d-flex justify-content-center">Sign In</h1>
        <div className="py-3">
          <span className="pull-left " width="100%">
            Email:{" "}
          </span>{" "}
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 px-4 w-100"
          />
          <br />
          <span className="pull-left ">Password: </span>
          <br />
          <input
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            className="mb-2 px-4 w-100"
          />{" "}
          <br />
          <button
            onClick={signIn}
            type="button"
            className="btn border-dark my-2 px-3 py-2 w-100"
            style={{ backgroundColor: "#e1ae80" }}>
            Sign In
          </button>
        </div>
        <div className="d-flex justify-content-center mb-3">OR</div>
        <button
          onClick={signInWithGoogle}
          type="button"
          className="btn btn-light border-dark w-100 px-3 py-2">
          <FontAwesomeIcon
            icon={faGoogle}
            style={{ color: "#df1616" }}
            className="mx-3"
          />
          Sign In with Google
        </button>
        <button
          onClick={logOut}
          type="button"
          className="btn border-dark my-2 px-3 py-2 w-100"
          style={{ backgroundColor: "#e1ae80" }}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SignIn;
