import React from "react";
import Skeleton from "../UI/Skeleton";

const NftCardSkeleton = ({
  showAvatar = false,
  showCountdown = false,
  showLikes = false,
}) => {
  return (
    <div className="px-2">
      <div className="nft__item">
        {showAvatar && (
          <div className="author_list_pp">
            <Skeleton className="skeleton-avatar" />
          </div>
        )}

        {showCountdown && (
          <div className="de_countdown skeleton-de-countdown">
            <Skeleton className="skeleton-countdown" />
          </div>
        )}

        <div className="nft__item_wrap">
          <Skeleton className="skeleton-image" />
        </div>

        <div className="nft__item_info">
          <Skeleton className="skeleton-title" />
          <Skeleton className="skeleton-price" />

          {showLikes && (
            <div className="nft__item_like">
              <Skeleton className="skeleton-heart" />
              <Skeleton className="skeleton-like-text" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftCardSkeleton;