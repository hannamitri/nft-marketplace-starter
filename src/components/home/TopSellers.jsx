import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setSeller(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers();
    setLoading(true);
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
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index} className="skeleton__list">
                      <div className="author_list_pp skeleton__links">
                        <i className="fa fa-check skeleton__check"></i>
                      </div>
                      <div className="author_list_info skeleton__info"></div>
                      <div className="skeleton__price"></div>
                    </li>
                  ))
                : seller.map((seller) => (
                    <li key={seller.id} >
                      <div className="author_list_pp" >
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
                        <span>{seller.price}</span>
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
