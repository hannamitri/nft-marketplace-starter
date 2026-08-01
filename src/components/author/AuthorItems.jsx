import React from "react";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ items }) => (
  <div className="de_tab_content">
    <div className="tab-1">
      <div className="row">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={item.nftId}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 50}
            >
              <NftCard item={item} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No creations are currently available for this author.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default AuthorItems;
