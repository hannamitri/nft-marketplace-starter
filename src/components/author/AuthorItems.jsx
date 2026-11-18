import React from "react";
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const AuthorItems = ({ author }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!author 
            ? 
              new Array(8).fill(0).map((_, index) => (
                <div className="cog-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <NftCardSkeleton />
                </div>
              ))
              :
              (
                author.nftCollection.map((nft) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
                    <NftCard item={{ ...nft, authorImage: author.authorImage, authorId: author.authorId }} />
                  </div>
              )))
            }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
