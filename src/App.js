import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import { Routes, Route } from "react-router-dom";
import Book from "./components/Book";
import AddBook from "./components/AddBook";
import Explore from "./components/Explore";
import Library from "./components/Library";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/book/:id" element={<Book />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/addbook" element={<AddBook />} />
        <Route exact path="/library" element={<Library />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
