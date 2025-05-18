import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchSellers() {
    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );

    const data = await response.json();
    setSellers(data);
  }

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  React.useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div data-aos="fade-up" className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="100px" height="20px" />
                      <Skeleton width="50px" height="20px" />
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
                          alt=""
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
