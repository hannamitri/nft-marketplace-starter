import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopSellerSkeletons from "../UI/TopSellerSkeletons";

const TopSellers = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((response) => setCollections(response.data))
      .catch((err) => console.error(err));
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
              {collections.length === 0 ? (
                <TopSellerSkeletons />
              ) : (
                collections.map((collection) => (
                  <li key={collection.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={collection.authorImage}
                          alt={collection.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${collection.authorId}`}>{collection.authorName}</Link>
                      <span>{collection.price} ETH</span>
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
