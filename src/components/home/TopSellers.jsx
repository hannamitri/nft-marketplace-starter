import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
const TopSellers = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
useEffect(() => {
  const fetchAuthors = async () => {
    try {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchAuthors();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error loading authors!</div>;

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
            {authors.map((author, index) => (
              <li key={index}>
                <div className="author_list_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-author"
                      src={author.authorImage || AuthorImage}
                      alt={author.authorName}
                    />

                    <Link to="/author">{author.authorName}</Link>
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to="/author">{author.name}</Link>
                  <span>{author.price} ETH</span>
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
