import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ author }) => {
  const items = author?.nftCollection || [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.nftId || item.id}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${author.authorId}`}>
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage}
                        alt={author.authorName}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(author.authorName || "NFT");
                        }}
                      />
                      <i className="fa fa-check"></i>
                    </div>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <Link
                    to={`/item-details/${item.nftId}`}
                    state={{
                      item: {
                        ...item,
                        authorId: author.authorId,
                        authorName: author.authorName,
                        authorImage: author.authorImage,
                      },
                    }}
                  >
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link
                    to={`/item-details/${item.nftId}`}
                    state={{
                      item: {
                        ...item,
                        authorId: author.authorId,
                        authorName: author.authorName,
                        authorImage: author.authorImage,
                      },
                    }}
                  >
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_action">
                    <div className="nft__item_price">{item.price} ETH</div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
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