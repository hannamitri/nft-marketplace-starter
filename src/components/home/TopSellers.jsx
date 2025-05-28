import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setPost(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchPost();
  });

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
              {post.map((posts) => (
                <>
                  {loading ? (
                    <li>
                      <div className="TS__skeleton">
                        <div className="TS__pfp--skeleton">
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="TS__name--skeleton"></div>
                        <div className="TS__price--skeleton"></div>
                      </div>
                    </li>
                  ) : (
                    <li key={posts.id}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={posts.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{posts.authorName}</Link>
                        <span>{posts.price} ETH</span>
                      </div>
                    </li>
                  )}
                </>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
