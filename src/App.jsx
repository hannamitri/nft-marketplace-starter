import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ItemDetails from "./pages/ItemDetails";
import Author from "./pages/Author";

const App = () => {
return (
<Router>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/explore" element={<Explore />} />
<Route path="/item-details/:itemId" element={<ItemDetails />} />
<Route path="/author/:authorId" element={<Author />} />
</Routes>
</Router>
);
};

export default App;
