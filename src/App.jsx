import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AuthorItems from "./components/author/AuthorItems";

function App() {
  
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  
  // Restore the scroll position after refresh
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('scrollPosition')) {
      window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
      sessionStorage.removeItem('scrollPosition');
    }
  });
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/author/:authorId" element={<AuthorItems />} />
        <Route path="/item-details/:nftItemId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
