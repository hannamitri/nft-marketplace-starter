import React from "react";
import { Link } from "react-router-dom";
import ItemCard from "../UI/ItemCard";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";

const AuthorItems = ({ item, isLoaded }) => {
  const collections = item.nftCollection;
  const authorImage = item.authorImage;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoaded ? (
            <>
              {collections?.map((collection, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={collection.id}
                >
                  <ItemCard item={collection} dp={authorImage} />
                </div>
              ))}
            </>
          ) : (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <ItemCardSkeleton />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
