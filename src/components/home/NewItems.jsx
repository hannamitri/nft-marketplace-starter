import React from "react";
import NftCard from "../UI/NftCard";
import { items } from "../../data/marketplaceData";

const NewItems = () => {
  const newestItems = items.slice(0, 4);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newestItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <NftCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
