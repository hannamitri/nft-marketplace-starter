import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "../components/skeleton/Skeleton";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { state } = useLocation();
  const item = state?.item;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  // Simulate details loading (you can remove this if details load instantly)
  useEffect(() => {
    if (item) {
      setTimeout(() => setDetailsLoaded(true), 300);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="container mt-5">
        <h3>No item data found</h3>
        <p>Try navigating from Hot Collections again.</p>
      </div>
    );
  }

  const imageSrc = item.nftImage || nftImage;
  const title = item.title;
  const authorImg = item.authorImage || AuthorImage;
  const authorId = item.authorId;
  const nftId = item.nftId;
  const code = item.code;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* LEFT SIDE — NFT IMAGE */}
              <div className="col-md-6 text-center">
                {!imageLoaded && (
                  <Skeleton width="100%" height="400px" />
                )}

                <img
                  src={imageSrc}
                  alt={title}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    display: imageLoaded ? "block" : "none",
                    width: "100%",
                    borderRadius: "10px"
                  }}
                />
              </div>

              {/* RIGHT SIDE — DETAILS */}
              <div className="col-md-6">
                <div className="item_info">

                  {/* TITLE */}
                  {!detailsLoaded ? (
                    <Skeleton width="60%" height="35px" />
                  ) : (
                    <h2>{title}</h2>
                  )}

                  {/* NFT ID */}
                  {!detailsLoaded ? (
                    <Skeleton width="40%" height="20px" />
                  ) : (
                    <p><strong>NFT ID:</strong> {nftId}</p>
                  )}

                  {/* CODE */}
                  {!detailsLoaded ? (
                    <Skeleton width="30%" height="20px" />
                  ) : (
                    <p><strong>Code:</strong> {code}</p>
                  )}

                  {/* OWNER */}
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      {!detailsLoaded ? (
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      ) : (
                        <img src={authorImg} alt={authorId} />
                      )}
                    </div>

                    <div className="author_list_info">
                      {!detailsLoaded ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <Link to="/author">{authorId}</Link>
                      )}
                    </div>
                  </div>

                  <div className="spacer-20"></div>

                  {/* CREATOR */}
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      {!detailsLoaded ? (
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      ) : (
                        <img src={authorImg} alt={authorId} />
                      )}
                    </div>

                    <div className="author_list_info">
                      {!detailsLoaded ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <Link to="/author">{authorId}</Link>
                      )}
                    </div>
                  </div>

                  <div className="spacer-20"></div>

                  {/* PRICE */}
                  <h6>Price</h6>
                  {!detailsLoaded ? (
                    <Skeleton width="80px" height="25px" />
                  ) : (
                    <div className="nft-item-price">
                      <span>{item.price || "N/A"}</span>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;