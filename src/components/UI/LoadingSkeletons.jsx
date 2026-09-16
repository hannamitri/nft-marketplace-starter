import React from "react";
import Skeleton from "./Skeleton";

export const NftGridSkeleton = ({ count = 4, label = "Loading items" }) => (
  <div className="col-12 nft-loading-grid" role="status" aria-label={label}>
    {Array.from({ length: count }, (_, index) => (
      <div className="nft-loading-card" key={index} aria-hidden="true">
        <Skeleton width="100%" height="auto" borderRadius="8px" />
        <Skeleton width="65%" height="18px" borderRadius="4px" />
        <Skeleton width="35%" height="14px" borderRadius="4px" />
      </div>
    ))}
  </div>
);

export const SellerListSkeleton = ({ count = 12 }) => (
  <ol className="author_list seller-loading-list" role="status" aria-label="Loading top sellers">
    {Array.from({ length: count }, (_, index) => (
      <li key={index} aria-hidden="true">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
        <div className="seller-loading-copy">
          <Skeleton width="120px" height="16px" borderRadius="4px" />
          <Skeleton width="70px" height="13px" borderRadius="4px" />
        </div>
      </li>
    ))}
  </ol>
);

export const AuthorProfileSkeleton = () => (
  <div className="author-profile-loading" role="status" aria-label="Loading author profile">
    <div className="author-profile-loading-header" aria-hidden="true">
      <Skeleton width="150px" height="150px" borderRadius="50%" />
      <div className="author-profile-loading-copy">
        <Skeleton width="210px" height="28px" borderRadius="4px" />
        <Skeleton width="130px" height="16px" borderRadius="4px" />
        <Skeleton width="min(520px, 75vw)" height="16px" borderRadius="4px" />
        <Skeleton width="110px" height="16px" borderRadius="4px" />
      </div>
    </div>
    <NftGridSkeleton count={4} label="Loading author NFTs" />
  </div>
);
