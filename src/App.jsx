import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Author = lazy(() => import("./pages/Author"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));

function App() {
  return (
    <Router>
      <Nav />
      <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/" element={<Explore />} />
          <Route path="/author/:authorId" element={<Author />} /> 
          <Route path="/item-details/:nftId" element={<ItemDetails />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
