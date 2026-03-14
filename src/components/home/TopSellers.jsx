import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTopSellers(data);
      } catch (error) {
        // Fallback data for when API is unavailable
        setTopSellers([
          {
            id: 1,
            authorName: "CryptoArtist",
            authorId: "0x1234...5678",
            price: "12.58",
            authorImage: null
          },
          {
            id: 2,
            authorName: "DigitalCreator",
            authorId: "0x2345...6789",
            price: "8.94",
            authorImage: null
          },
          {
            id: 3,
            authorName: "NFTMaster",
            authorId: "0x3456...7890",
            price: "15.23",
            authorImage: null
          },
          {
            id: 4,
            authorName: "BlockchainArt",
            authorId: "0x4567...8901",
            price: "6.77",
            authorImage: null
          }
        ]);
      } finally {
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
                <p>Loading...</p>
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
              {topSellers.map((seller) => (
                <li key={seller.id}>
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
