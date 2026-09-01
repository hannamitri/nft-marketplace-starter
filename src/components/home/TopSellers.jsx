import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top sellers");
        }

        const data = await response.json();

        setSellers(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
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
          <div className="text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
            <p>Loading sellers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
            <p>{error}</p>
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
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="650"
            >
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => (
                <li
                  key={seller.id}
                  data-aos="fade-up"
                  data-aos-duration="650"
                  data-aos-delay={(index % 4) * 100}
                  data-aos-offset="100"
                  data-aos-once="true"
                >
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName}
                      />

                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="author_list_info">
                    <Link to="/author">
                      {seller.authorName}
                    </Link>

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