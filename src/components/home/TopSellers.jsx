import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [loading, setLoading] = useState([]);
  const [collections, setCollections] = useState();
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setCollections(data);
      setLoading(false);
    }
    getData();
  }, []);
  // async function fetchPosts(userId) {
  //   const { data } = await axios.get(
  //     "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
  //   );
  //   setCollections(data);
  //   setLoading(false);
  //   console.log(collections);
  // }
  // fetchPosts();
  return (
    <section id="section-popular" className="pb-5">
      <div className="container" data-aos="fade-up"> 
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
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={AuthorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">Monica Lucas</Link>
                        <span>2.1 ETH</span>
                      </div>
                    </li>
                  ))
                : collections.map((collection) => (
                    <li key={collection.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={collection.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{collection.authorName}</Link>
                        <span>{collection.price} ETH</span>
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
