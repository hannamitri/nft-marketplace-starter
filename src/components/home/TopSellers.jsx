import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  async function fetchSellers() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(data);
      setIsLoaded(true)
  }

  useEffect(() => {
    fetchSellers();
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
              {
                isLoaded 
                ? (sellers.map((seller, index) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))) 
                : (new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="skeleton-box" style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%'
                      }}/>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton-box" style={{
                        width: '120px',
                        height: '20px',
                        marginBottom: '5px'
                      }}/>
                      <div className="skeleton-box" style={{
                        width: '80px', 
                        height: '16px'
                      }}/>
                    </div>
                  </li>
                )))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
