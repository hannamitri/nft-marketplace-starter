import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SkeletonTS } from "./SkeletonCard";

const TopSellers = () => {
  const [topSellers, setTopSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getTopSellers();
  }, [])

  async function getTopSellers() {
    try {
      setLoading(true); 
      const res = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
      setTopSellers(res.data);
      setLoading(false);
    } catch(err) {
      console.error(err);
    }
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
              {/* Loading State */}
              {loading && (
                  new Array(12).fill(0).map((_, index) => (
                       <SkeletonTS key={`skeleton-${index}`} />
                  ))
              )}

              {/* Actual top sellers */}
              {!loading && topSellers.length > 0 && 
                (topSellers).map((seller) => (
                  <li key={seller.id}>
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
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
