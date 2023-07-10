import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect } from "react";

function App() {
  // const GetData = () => {
    useEffect(() => {
      axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
        .then(response => {
          // Handle the successful response
          console.log(response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
      }, [])
  // };
  // GetData()
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details/:authorId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
