import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Item from "../UI/Item";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({nftCollection = [], authorImage, authorId}) => {
  
  const loading = nftCollection.length === 0

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {
            loading ? 
              <div className="row">
                {new Array(8).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="nft__item">
                      <Skeleton width={"100%"} height={"400px"} />
                    </div>
                  </div>
                ))}
              </div>
              
            : nftCollection.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <Item 
                  key={item.id}
                  index={index}
                  authorImage={authorImage}
                  authorId={authorId}
                  nftImage={item.nftImage}
                  nftId={item.nftId}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  expiryDate={0}
                />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
