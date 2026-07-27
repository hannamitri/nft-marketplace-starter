import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildTopSellers, fetchTopSellers } from "../../data/marketplaceApi";

const TopSellers = () => {
  const [apiSellers, setApiSellers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadTopSellers = async () => {
      try {
        const loadedSellers = await fetchTopSellers();
        if (isMounted) {
          setApiSellers(loadedSellers);
        }
      } catch (error) {
        if (isMounted) {
          setApiSellers([]);
        }
      }
    };

    loadTopSellers();

    return () => {
      isMounted = false;
    };
  }, []);

  const sellers = buildTopSellers(apiSellers);

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
                <li key={seller.id} data-aos="fade-up" data-aos-delay={Math.min(index * 40, 240)}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.id}`}>
                      <img className="lazy pp-author" src={seller.image} alt={seller.name} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.id}`}>{seller.name}</Link>
                    <span>
                      {typeof seller.price === "number"
                        ? `${seller.price.toFixed(1)} ETH`
                        : `${seller.followers} followers`}
                    </span>
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
