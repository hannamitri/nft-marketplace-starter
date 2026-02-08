import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TopSellerSkeleton from "../UI/TopSellerSkeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSellers() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );

        setSellers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getSellers();
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
                ? new Array(12)
                    .fill(0)
                    .map((_, index) => <li><TopSellerSkeleton key={index}/></li>)
                : sellers.map((seller) => (
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
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
