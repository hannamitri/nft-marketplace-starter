import React from "react";
import { Link } from "react-router-dom";      // I use Link for internal navigation
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = () => {
  // I build real share URLs so my <a> tags are valid and accessible
  const shareUrl = `${window.location.origin}/item-details`; // I point to the details page
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent("Check out this NFT!");

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl  = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const emailUrl    = `mailto:?subject=${encodeURIComponent(
    "Check this NFT"
  )}&body=${encodedUrl}`;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  {/* I replace empty to="" with a real route so it's valid */}
                  <Link to="/author">
                    <img className="lazy" src={AuthorImage} alt="Author avatar" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      {/* I keep this a real button (not a fake anchor) */}
                      <button>Buy Now</button>

                      <div className="nft__item_share">
                        <h4>Share</h4>
                        {/* I give each anchor a real URL so eslint is happy */}
                        <a href={facebookUrl} target="_blank" rel="noreferrer noopener" aria-label="Share on Facebook">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href={twitterUrl} target="_blank" rel="noreferrer noopener" aria-label="Share on X">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href={emailUrl} aria-label="Share via email">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt="NFT preview"
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>Pinky Ocean</h4>
                  </Link>

                  <div className="nft__item_price">2.52 ETH</div>

                  {/* I keep this as a non-link since it doesn't navigate */}
                  <div className="nft__item_like">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <span>97</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
