import React from "react";
import NewItem from "../utility/NewItem";
import NewItemLoadingState from "../utility/NewItemLoadingState";


const AuthorItems = ({nftCollection, authorImage, loading}) => {
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {!loading ? (nftCollection.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <NewItem newItem={nft} authImg={authorImage}/>
            </div>
          ))) : (
            new Array(nftCollection.length).fill(0).map((_, index)=> (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <NewItemLoadingState/>
              </div>
            ))
          ) 
        
        }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
