import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = () => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchAuthor() {
    setLoading(true);

    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012"
    );

    const data = await response.json();

    setTimeout(() => {
      setAuthor(data);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">Loading...</div>
              </div>
            ))
          ) : (
            author.nftCollection?.map((item, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img
                        className="lazy"
                        src={author.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                      </div>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
