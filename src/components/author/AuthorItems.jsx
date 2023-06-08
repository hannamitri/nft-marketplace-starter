import React from "react";
import NewItem from "../utility/NewItem";


const AuthorItems = ({nftCollection, authorImage}) => {
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {nftCollection.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <NewItem newItem={nft} authImg={authorImage}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
