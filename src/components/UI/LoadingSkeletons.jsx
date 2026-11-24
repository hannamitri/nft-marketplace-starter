import React from "react";
import Skeleton from "./Skeleton";
import "../../css/styles/Skeletons.css";

export const NftCardSkeleton = () => (
  <div className="nft__item skeleton-nft-card" aria-hidden="true">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
    </div>
    <div className="nft__item_wrap">
      <Skeleton
        className="skeleton-media"
        width="100%"
        height="230px"
        borderRadius="12px"
      />
    </div>
    <div className="nft__item_info">
      <Skeleton width="65%" height="18px" borderRadius="4px" />
      <div className="skeleton-nft-meta">
        <Skeleton width="56px" height="14px" borderRadius="4px" />
        <Skeleton width="36px" height="14px" borderRadius="4px" />
      </div>
    </div>
  </div>
);

export const NftGridSkeleton = ({ count = 8 }) => (
  <div className="row" role="status" aria-label="Loading items">
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        aria-hidden="true"
      >
        <NftCardSkeleton />
      </div>
    ))}
  </div>
);

export const CollectionCardSkeleton = () => (
  <div className="nft_coll skeleton-collection-card" aria-hidden="true">
    <div className="nft_wrap">
      <Skeleton
        className="skeleton-media"
        width="100%"
        height="190px"
        borderRadius="12px"
      />
    </div>
    <div className="nft_coll_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
    </div>
    <div className="nft_coll_info">
      <Skeleton width="70%" height="16px" borderRadius="4px" />
      <Skeleton width="42%" height="13px" borderRadius="4px" />
    </div>
  </div>
);

export const AuthorProfileSkeleton = () => (
  <div
    className="d_profile de-flex"
    role="status"
    aria-label="Loading creator profile"
  >
    <div className="de-flex-col">
      <div className="profile_avatar">
        <Skeleton width="100px" height="100px" borderRadius="50%" />
        <div className="profile_name">
          <h4>
            <Skeleton width="170px" height="24px" borderRadius="4px" />
            <span className="skeleton-profile-lines">
              <Skeleton width="115px" height="16px" borderRadius="4px" />
              <Skeleton width="235px" height="16px" borderRadius="4px" />
            </span>
          </h4>
        </div>
      </div>
    </div>
    <div className="profile_follow de-flex">
      <div className="de-flex-col skeleton-profile-actions">
        <Skeleton width="92px" height="16px" borderRadius="4px" />
        <Skeleton width="120px" height="40px" borderRadius="6px" />
      </div>
    </div>
  </div>
);

const PersonSkeleton = () => (
  <div className="skeleton-person" aria-hidden="true">
    <Skeleton width="50px" height="50px" borderRadius="50%" />
    <div className="skeleton-person-copy">
      <Skeleton width="112px" height="14px" borderRadius="4px" />
      <Skeleton width="74px" height="12px" borderRadius="4px" />
    </div>
  </div>
);

export const ItemDetailsSkeleton = () => (
  <div id="wrapper" role="status" aria-label="Loading item details">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <Skeleton
                className="skeleton-media"
                width="100%"
                height="440px"
                borderRadius="12px"
              />
            </div>
            <div className="col-md-6 skeleton-item-info">
              <Skeleton width="70%" height="30px" borderRadius="4px" />
              <div className="skeleton-item-counts">
                <Skeleton width="58px" height="16px" borderRadius="4px" />
                <Skeleton width="48px" height="16px" borderRadius="4px" />
              </div>
              <div className="skeleton-description">
                <Skeleton width="100%" height="13px" borderRadius="4px" />
                <Skeleton width="96%" height="13px" borderRadius="4px" />
                <Skeleton width="83%" height="13px" borderRadius="4px" />
              </div>
              <div className="skeleton-item-person">
                <Skeleton width="54px" height="16px" borderRadius="4px" />
                <PersonSkeleton />
              </div>
              <div className="skeleton-item-person">
                <Skeleton width="60px" height="16px" borderRadius="4px" />
                <PersonSkeleton />
              </div>
              <div className="skeleton-item-price">
                <Skeleton width="42px" height="16px" borderRadius="4px" />
                <Skeleton width="72px" height="20px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);
