import React from "react";
import Skeleton from "react-loading-skeleton";

const ExploreItemsSkeleton = () => {
  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton circle width={50} height={50} />
          <i className="fa fa-check"></i>
        </div>
        <div
          className="nft__item_wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href=""
            style={{
                marginTop: "50px"
            }}
          >
            <Skeleton
              width={"100%"}
              height={200}
              style={{
                display: 'block',
                margin: 0,
                padding: 0,
              }}
            />
          </a>
        </div>
        <div className="nft__item_info">
          <h4
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            <Skeleton
              style={{
                margin: 0,
                padding: 0,
              }}
            />
          </h4>
          <div
            className="nft__item_price"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "-10px",
              padding: 0,
            }}
          >
            <Skeleton
              width={50}
              style={{
                margin: 0,
                padding: 0,
              }}
            />
          </div>
          <div
            className="nft__item_like"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginLeft: "-20px",
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreItemsSkeleton;
