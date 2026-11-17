import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/UI/Nav';
import Footer from './components/UI/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ItemDetails from './pages/ItemDetails';
import Author from './pages/Author';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <BrowserRouter>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/item-details/:nftId" element={<ItemDetails />} />
          <Route path="/author/:authorId" element={<Author />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;