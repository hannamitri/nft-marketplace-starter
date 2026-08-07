import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { getCreatorDisplayName, getOwnerDisplayName } from "../../utils/authorProfiles";

const AuthorItems = ({ authorId, authorCollection = [], authorImage = "", authorName = "", loading = false }) => {
  const items = Array.isArray(authorCollection)
    ? authorCollection.map((item) => ({
        ...item,
        authorId: item.authorId ?? authorId,
        authorName: item.authorName || item.author || item.name || authorName,
      }))
    : [];

  if (loading) {
    return <div className="text-center py-4">Loading author items...</div>;
  }

  if (!items.length) {
    return <div className="text-center py-4">No NFTs found for this author.</div>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => {
            const itemId = item.nftId || item.id;
            const title = item.title || item.name || "Untitled";
            const price = item.price ?? item.cost ?? "0";
            const likes = item.likes ?? item.like ?? 0;
            const image = item.nftImage || item.image || "";
            const displayAuthorName = getCreatorDisplayName({
              ...item,
              authorName: item.authorName || authorName,
              author: item.author || authorName,
            });
            getOwnerDisplayName({
              ...item,
              ownerName: item.ownerName || item.owner || authorName,
              owner: item.owner || authorName,
            });

            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={itemId || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy" src={item.authorImage || authorImage || AuthorImage} alt={displayAuthorName} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <button type="button" aria-label="Share on Facebook" style={{ background: "transparent", border: "none", padding: 0 }}>
                            <i className="fa fa-facebook fa-lg"></i>
                          </button>
                          <button type="button" aria-label="Share on Twitter" style={{ background: "transparent", border: "none", padding: 0 }}>
                            <i className="fa fa-twitter fa-lg"></i>
                          </button>
                          <button type="button" aria-label="Share by email" style={{ background: "transparent", border: "none", padding: 0 }}>
                            <i className="fa fa-envelope fa-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Link to={itemId ? `/item-details/${itemId}` : "/item-details"} state={{ item }}>
                      <img src={image} className="lazy nft__item_preview" alt={title} />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={itemId ? `/item-details/${itemId}` : "/item-details"} state={{ item }}>
                      <h4>{title}</h4>
                    </Link>
                    <div className="nft__item_price">{price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
