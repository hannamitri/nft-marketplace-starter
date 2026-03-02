import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authorId) return;

    setIsLoading(true);

    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        const authorData = Array.isArray(data) ? data[0] : data;

        setAuthor(authorData);
        setItems(authorData?.nftCollection || []);
      })
      .catch((err) => {
        console.error("author api error:", err);
        setItems([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              >
                <div className="nft__item">
                  <Skeleton width="100%" height="350px" borderRadius="12px" />
                </div>
              </div>
            ))}

          {!isLoading &&
            items.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy" src={author?.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
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
            ))}

          {!isLoading && !items.length && (
            <div style={{ padding: 12 }}>No items found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;