import React from "react";
import ItemCard from "../UI/ItemCard";
import CardSkeleton from "../UI/CardSkeleton";

const AuthorItems = ({ data, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {data ? (
            data.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                authorImage={authorImage}
                expiryDate={item.expiryDate}
                nftImage={item.nftImage}
                title={item.title}
                price={item.price}
                likes={item.likes}
                onExplorePage={true}
                nftId={item.nftId}
              />
            ))
          ) : (
            <div className="card_skel_wrapper">
              {new Array(8).fill(0).map((_, index) => {
                return (
                  <div className="card_skel" key={index}>
                    <CardSkeleton />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
