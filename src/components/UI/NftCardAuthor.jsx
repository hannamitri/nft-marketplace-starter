
import { Link } from "react-router-dom";

import { Skeleton } from "@mui/material";

const NftCardAuthor = ({ item, loading, collection }) => {
  return (
    <div className="nft__item mx-2">
      <div className="author_list_pp">
        {loading ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <Link
            to={{
              pathname: `/author/${item.authorId}`,
            }}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Creator: ${item.authorName}`}
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        )}
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
        {loading ? (
          <Skeleton variant="rectangular" width={200} height={200} />
        ) : (
          <Link
            to={{
              pathname: `/item-details/${collection.nftId}`,
            }}
          >
            <img
              src={collection.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        )}
      </div>
      <div className="nft__item_info">
        {loading ? (
          <Skeleton />
        ) : (
          <Link to={`/item-details/${collection.nftId}`}>
            <h4>{collection.title}</h4>
          </Link>
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="nft__item_price">{collection.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{collection.likes}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NftCardAuthor;
