import React from "react";
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ author }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!author 
            ? 
              new Array(8).fill(0).map((_, index) => (
                <div className="cog-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="200px" borderRadius="8px" />
                    </div>
                    <div className="nft__item_info">
                      <div><Skeleton width="70%" height="20px" /></div>
                      <div><Skeleton width="40%" height="16px" /></div>
                    </div>
                  </div>
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
