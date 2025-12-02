import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
 gibson-explore-items
        console.log("Fetching top sellers...");
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        console.log("Response received:", response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Data received:", data);
        setTopSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        // Set some fallback data for testing
        setTopSellers([
          {
            id: 1,
            authorName: "Monica Lucas",
            authorImage: null,
            authorId: 83937449,
            price: 1.2
          },
          {
            id: 2,
            authorName: "Lori Hart",
            authorImage: null,
            authorId: 83937450,
            price: 2.1
          }
        ]);
=======
        const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        const data = await response.json();
        setTopSellers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top sellers:', error);
main
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  if (loading) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
 gibson-explore-items
                <p>Loading top sellers...</p>
=======
                <p>Loading...</p>
 main
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
 gibson-explore-items
              {topSellers.map((seller, index) => (
                <li key={seller.id || index}>
=======
              {topSellers.map((seller) => (
                <li key={seller.id}>
 main
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage || AuthorImage}
                        alt={seller.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
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
