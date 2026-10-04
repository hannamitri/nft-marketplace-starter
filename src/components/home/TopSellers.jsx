import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const authors = [
  {
    name: "Monica Lucas",
    image: AuthorImage,
  },
  {
    name: "John Smith",
    image: AuthorImage,
  },
];

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState();
  async function fetchTopSellers() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    const data = await response.json();

    console.log(data);
    setTopSellers(data);
    setLoading(false);
  }

useEffect(()=> {
  fetchTopSellers()
}, [])




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
              {topSellers.map((author, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                   <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={author.authorImage}
                        alt={author.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>
                  {author.authorName}
                   </Link>
                    <span>2.1 ETH</span>
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
