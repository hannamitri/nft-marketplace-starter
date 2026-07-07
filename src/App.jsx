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
  async function collections(){
    const response= await axios.get ("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
   const data= response.data;
   console.log(data);  
  } 
  useEffect((
   )=>{collections()});
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />zzz
    </Router>
  );
}

export default App;
