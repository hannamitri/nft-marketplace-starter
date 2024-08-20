import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
    Aos.init(); // Initialize AOS animation
  }, []); // Empty dependency array to run on component mount

  return (
    <section id="section-popular" className="pb-5">
      <div data-aos="zoom-in"className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={99} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={60} height={20} />
                      </div>
                    </li>
                  ))
                : items.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage || AuthorImage}
                            alt={item.authorName || "Author"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName || "Unknown Author"}
                        </Link>
                        <span>{item.totalSales} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;