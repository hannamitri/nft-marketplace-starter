import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import NFTList from "./components/dev/NFTList";
import AuthorList from "./components/dev/AuthorList";

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/author/:authorId" element={<Author />} />
            <Route path="/item-details/:itemId" element={<ItemDetails />} />
            
            {/* ✅ New routes */}
            <Route path="/nft-list" element={<NFTList />} />
            <Route path="/authors" element={<AuthorList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
