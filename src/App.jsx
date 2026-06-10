import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [newItems, setNewItems] = useState([]);
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")

        setNewItems(response.data)
        // console.log(response.data)
      }catch (error) {
        console.log(error)
      }finally {
        setLoading(false)
      }
    }

    fetchNewItems()
  }, [])


  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    
          setUsers(response.data)
          // console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchUsers()
    }, [])


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home users={users} loading={loading} newItems={newItems}/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails users={users} newItems={newItems}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
