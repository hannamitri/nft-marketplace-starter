import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  useEffect(() => {
    getTopSellersResponse();
  }, []);

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTopSellersResponse() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setUsersData(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    console.log(data);
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
          <div className="">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <div className="nft__topSellers--container" key={index}>
                      <div className="nft__topSellers--info">
                        <div className="skeleton-box nft__img--skeleton nft__topSellers--position"></div>
                        <figure className="check--skeleton nft__topSellers--checkmark--container">
                          <i className="fa fa-check fa-check--skeleton nft__topSellers--checkmark--position"></i>
                        </figure>
                        <div className="skeleton nft__name-skeleton skeleton-box"></div>
                        <div className="nft__topSellers--cost--container">
                          <div className="skeleton nft__id--skeleton skeleton-box"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : usersData.map((user, index) => (
                    <div className="newItems--author--container">
                      <li key={index}>
                        <div className="author_list_pp">
                          <Link to={`/author/${user.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={user.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${user.authorId}`}>
                            Monica Lucas
                          </Link>
                          <span>{user.price} ETH</span>
                        </div>
                      </li>
                    </div>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

{
  /* <div className="nft__topSellers--container">
<div className="skeleton nft__name-skeleton skeleton-box">a</div>
<div className="skeleton nft__id--skeleton skeleton-box">b</div>
</div> */
}
