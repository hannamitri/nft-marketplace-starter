
import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./UI/Countdown";
import Skeleton from "./UI/Skeleton";

const AllItems = ({ item, loading }) => {
  if (loading) {
    return (
      <div className="p-2">
        <div className="nft_coll">
          <div className="nft_wrap">
            <Skeleton width={500} height={270} />
          </div>
          <div className="nft_coll_pp">
            <Skeleton width={50} height={50} borderRadius={99} />
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <h4>
              <Skeleton height={20} width="40%" />
            </h4>
            <span>
              <Skeleton height={20} width="20%" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nft__item h-full" data-aos="fade-in">
      <div className="flex items-start author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${item.authorName}`}
        >
          <img
            className="lazy h-12 w-12 rounded-full"
            src={item.authorImage}
            alt=""
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <div className="mb-5">
        {item.expiryDate && (
          <div className="flex align-center pt-5">
            <Countdown key={item.id} expiryDate={item.expiryDate} />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage}
            className="lazy h-64 w-full object-cover"
            alt={item.title}
          />
        </Link>
      </div>

      <div className="nft__item_info min-h-[100px] mt-4">
        <Link to={`/item-details/${item.nftId}`}>
          <h4 className="text-center">{item.title}</h4>
        </Link>
        <div className="nft__item_price text-center">
          {item.price} ETH
        </div>
        <div className="nft__item_like text-center">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default AllItems;
