import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExploreItems, getNewItems } from "../../API/nftAPI";
import { useParams } from "react-router-dom";
import AOS from "aos";

const AuthorItems = ({ items, authorImage }) => {

  useEffect(() => {
    AOS.refresh();
  }, [items]);

  if (!items || !items.length) {
    return <div style={{ padding: 60 }}>No items found.</div>;
  }

  return (
    <>
      {items.map((item) => (
        <div
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={item.nftId}
          data-aos="fade-up"
        
        >
          <div className="nft__item">

            <div className="author_list_pp" style={{ top: "10px" }}>
              <Link to={`/author/${item.authorId}`}>
                <img src={authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
  <Link to={`/item/${item.nftId}`}>
    <h4>{item.title}</h4>
  </Link>

  <div className="nft__item_price">
    {item.price} ETH
  </div>

  <div className="nft__item_like" style={{ color: "#707070ff", fontWeight: "500" }}>
  <i className="fa fa-heart"></i> {item.likes}
</div>
</div>

          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorItems;