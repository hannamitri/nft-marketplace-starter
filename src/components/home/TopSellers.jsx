import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Aos from "aos";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchSellers() {
    setLoading(true);
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setSellers(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchSellers();
    Aos.init()
  }, []);

  function loadingSkeleton(index) {
    return (
      <li key={index}>
        <div className="author_list_pp">
          <Skeleton width={50} height={50} borderRadius={99} />
          <i className="fa fa-check"></i>
        </div>
        <div className="author_list_info">
        <Skeleton width={100} height={20} />
          <span>
          <Skeleton width={50} height={20} />
          </span>
        </div>
      </li>
    );
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list" data-aos="fade-in">
              {loading ? (
                <>
                  {new Array(12).fill(0).map((_, index) => {
                    return loadingSkeleton(index);
                  })}
                </>
              ) : (
                sellers.map((seller, index) => (
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
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
