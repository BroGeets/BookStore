import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../config/firebase";
import "./BookStyle.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function AddBook() {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCover, setNewCover] = useState(null);

  const bookCollectionRef = collection(db, "Books");
  const [coverUrl, setCoverUrl] = useState("");

  const onSubmitBook = async () => {
    try {
      await addDoc(bookCollectionRef, {
        AuthorID: auth?.currentUser.uid,
        Cover: coverUrl,
        Description: newDesc,
        Title: newTitle,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   const coversRef = ref(storage, "BookCovers/");
  const uploadFile = async () => {
    if (!newCover) return;
    const filesFolderRef = ref(storage, `BookCovers/${newCover.name}`);
    try {
      await uploadBytes(filesFolderRef, newCover).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setCoverUrl(url);
        });
      });
      console.log("uploaded");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: "#f5f4eb" }}>
      <div
        className="container-sm display:block my-0 px-5 py-5 text-dark"
        style={{ maxWidth: "400px", backgroundColor: "#f5f4eb" }}>
        <h1 className="mb-3 d-flex justify-content-center">Add Book</h1>
        {/* <Form.Group> */}
        <div className="py-3">
          <span className="pull-left " width="100%">
            Book Title:{" "}
          </span>{" "}
          <input
            placeholder="Title"
            className="mb-2 px-4 w-100"
            onChange={(e) => setNewTitle(e.target.value)}></input>
          <br />
          <span className="pull-left " width="100%">
            Book Description:{" "}
          </span>{" "}
          <textarea
            placeholder="Description"
            rows={5}
            className="mb-2 px-4 w-100"
            onChange={(e) => setNewDesc(e.target.value)}></textarea>
          <br />
          <input
            type="file"
            onChange={() => uploadFile()}
            // onChange={(e) => setNewCover(e.target.files[0])}
            accept="image/*"></input>
          {/* <button
            className="btn border-dark my-2 px-3 py-2"
            onClick={() => uploadFile()}
            style={{ backgroundColor: "#e1ae80" }}>
            Upload File
          </button> */}
          <br />
          <button
            onClick={onSubmitBook}
            className="btn border-dark my-2 px-3 py-2 w-100"
            style={{ backgroundColor: "#e1ae80" }}>
            Submit
          </button>
        </div>
        {/* </Form.Group> */}
      </div>
    </div>
  );
}

export default AddBook;
