import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await res.json();
        setTopSellers(data);
      } catch (err) {
        console.error("Error fetching top sellers:", err);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.map((author, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage || AuthorImage}
                        alt={author.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>
                      {author.authorName}
                    </Link>
                    <span>{author.followers} Followers</span>
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


