import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { getAuthorDisplayName } from "../../utils/authorProfiles";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => setSellers(data));
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
              {sellers.map((seller, index) => {
                const authorName = getAuthorDisplayName(seller) || seller.authorName || seller.name || "Unknown Seller";
                const authorRouteId = seller.authorId || seller.creatorId || seller.ownerId;
                const authorProfilePath = authorRouteId ? `/author/${authorRouteId}` : null;

                return (
                <li key={seller.id || seller.authorId || index}>
                  <div className="author_list_pp">
                    {authorProfilePath ? (
                      <Link to={authorProfilePath}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    ) : (
                      <>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={authorName}
                        />
                        <i className="fa fa-check"></i>
                      </>
                    )}
                  </div>
                  <div className="author_list_info">
                    {authorProfilePath ? <Link to={authorProfilePath}>{authorName}</Link> : <span>{authorName}</span>}
                    <span>{seller.price ? `${seller.price} ETH` : "N/A"}</span>
                  </div>
                </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
