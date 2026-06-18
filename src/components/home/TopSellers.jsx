import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    )
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top sellers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading top sellers...</div>;
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
              {sellers.map((seller, index) => (
                <React.Fragment key={seller.address || index}>
                  <li>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.name}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to="/author">
                        {seller.name || seller.authorName}
                      </Link>
                    </div>
                  </li>
                  <span>
                    {seller.price ?? seller.volume ?? seller.eth ?? 0} ETH
                  </span>
                </React.Fragment>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
