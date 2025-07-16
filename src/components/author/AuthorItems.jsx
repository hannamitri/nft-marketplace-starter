import React from "react";
import NftCard from "../UI/NFTCards";
import Skeleton from "../UI/LoadSkeleton";

const AuthorItems = ({ authorInfo }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorInfo
            ? authorInfo.nftCollection.map((nft) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={nft?.id}
                >
                  <NftCard
                    nft={{
                      ...nft,
                      authorImage: authorInfo?.authorImage,
                      authorId: authorInfo?.authorId,
                    }}
                  />
                </div>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        width={"60px"}
                        height={"60px"}
                        borderRadius={"25px"}
                      />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width={"100%"} height={"100%"} />
                    </div>

                    <div className="nft__item_info">
                      <Skeleton
                        width={"160px"}
                        height={"20px"}
                        marginTop={"4px"}
                      />
                      <div className="nft__item_price">
                        <Skeleton width={"90px"} height={"20px"} />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width={"28px"} height={"20px"} />
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