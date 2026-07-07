import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import "../../css/styles/topsellers.css";
import axios from "axios";

const TopSellers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const getSellers = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        setUsers(getSellers.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
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
          {loading ? (
            <div className="col-md-12">
              <ol className="author_list">
                {Array.from({ length: 12 }).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                        <div className="author__img--loading loading"></div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <div className="author__name--loading loading"></div>
                      <div className="author__price--loading loading"></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <ol className="author_list">
              {users.map((user) => (
                <li className="authors" key={user.id}>
                  <div className="author_list_pp">
                    <div className="author__id">{user.id}.</div>
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
                    <Link to="/author">{user.authorName}</Link>
                    <span>{user.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
