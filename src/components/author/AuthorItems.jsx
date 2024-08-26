import React from "react";

import NewItemsCard from "../home/home-components/NewItemsComponents/NewItemsCard";

const AuthorItems = ({nfts, profile}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
            {
              nfts.map((nft) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key = {nft.id}>
                  <NewItemsCard nft = {nft} authorImg = {profile}/>
                </div>
              ))
            }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
