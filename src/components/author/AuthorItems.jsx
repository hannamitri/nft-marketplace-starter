import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItemSkeleton = () => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="nft__item_wrap">
        <Skeleton width="100%" height="260px" borderRadius="8px" />
      </div>
      <div className="nft__item_info">
        <Skeleton width="70%" height="18px" />
        <Skeleton width="45%" height="14px" />
      </div>
    </div>
  </div>
);

const AuthorItems = ({ author, loading }) => {
  const items = author?.nftCollection || [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
                <AuthorItemSkeleton key={index} />
              ))
            : items.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 50}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${author.authorId}`}
                        title={`View ${author.authorName}'s profile`}
                      >
                        <img
                          className="lazy"
                          src={author.authorImage}
                          alt={author.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button type="button">Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                item.title
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a
                              href={`mailto:?subject=${encodeURIComponent(
                                item.title
                              )}`}
                            >
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
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
              ))}

          {!loading && items.length === 0 && (
            <div className="col-md-12 text-center">
              <p>This author has no items yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
