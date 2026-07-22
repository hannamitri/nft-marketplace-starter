import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error("Unable to fetch top sellers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
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
      <li key={index}>
        <div className="author_list_pp">
          <Skeleton
            width={50}
            height={50}
            borderRadius="50%"
          />
        </div>

        <div className="author_list_info">
          <Skeleton
            width={110}
            height={18}
            borderRadius={4}
          />
          <Skeleton
            width={60}
            height={14}
            borderRadius={4}
          />
        </div>
      </li>
    ))
  : sellers.map((seller) => (
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
          <Link to={`/author/${seller.authorId}`}>
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