import React, {useEffect, useState} from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
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
                <li key={index} className="animate-pulse">
                  <div className="author_list_pp bg-gray-300 h-12 w-12 rounded-full" />
                  <div className="author_list_info mt-2">
                    <div className="bg-gray-300 h-4 w-24 mb-1 rounded" />
                    <div className="bg-gray-200 h-3 w-16 rounded" />
                  </div>
                </li>
              ))
              : sellers.map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {seller.authorName}
                    </Link>
                    <span>{parseFloat(seller.price).toFixed(2)}</span>
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