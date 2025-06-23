import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { SWRConfig } from "swr";
import axios from "axios";
import 'keen-slider/keen-slider.min.css'

function App() {
  return (
    <Router>
      <SWRConfig value={{
        fetcher: url => axios.get(url).then(res => res.data)
      }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </SWRConfig>
    </Router>
  );
}

export default App;
