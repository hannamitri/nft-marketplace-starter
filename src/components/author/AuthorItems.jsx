
import React from "react";
import { Link } from "react-router-dom";

import AuthorImage from "../../images/author_thumbnail.jpg";

const AuthorItems = ({ nftCollection = [], authorImage, authorId }) => {
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft) => {
            const emailUrl =
              "mailto:?subject=" +
              encodeURIComponent(nft.title + " NFT") +
              "&body=" +
              currentUrl;

            return (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={nft.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={"/author/" + authorId}>
                      <img
                        className="lazy"
                        src={authorImage || AuthorImage}
                        alt="Author"
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>

                        <div className="nft__item_share">
                          <h4>Share</h4>

                          <a
                            href={
                              "https://www.facebook.com/sharer/sharer.php?u=" +
                              currentUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>

                          <a
                            href={
                              "https://twitter.com/intent/tweet?url=" +
                              currentUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>

                          <a
                            href={emailUrl}
                            aria-label="Share by email"
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={"/item/" + nft.nftId}>
                      <img
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt={nft.title}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={"/item/" + nft.nftId}>
                      <h4>{nft.title}</h4>
                    </Link>

                    <div className="nft__item_price">
                      {nft.price} ETH
                    </div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {nftCollection.length === 0 && (
          <p className="text-center">No NFTs found for this author.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorItems;


