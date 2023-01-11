import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const baseUrl ="https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
  
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}`).then((res) => {
      setPost(res.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
              {
              loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp--loading">
                        <Link to="">
                          <div className="pp-coll_loading" alt=""></div>
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="nft_coll_info-title-loading"></div>
                        <div className="nft_coll_info-description-loading"></div>
                      </div>
                    </li>
                  ))
                : post?.map((post, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${post.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={post.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${post.authorId}`}>
                          {post.authorName}
                        </Link>
                        <span>{post.price} ETH</span>
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

export default TopSellers