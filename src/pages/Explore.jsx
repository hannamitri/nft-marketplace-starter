import React, { useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import useExploreItems from "../hooks/useExploreItems";

const Explore = () => {
  const [filter, setFilter] = useState("");
  const { items, loading, visibleCount, showMore } = useExploreItems(filter);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="explore">
      {/* Subheader */}
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb">
          <img src={SubHeader} alt="Subheader" />
          <h1 className="text-center">Explore</h1>
        </div>
      </section>

      {/* Filters */}
      <section className="container">
        <div className="row mb-4">
          <div className="col-md-3">
          <select className="form-select" onChange={handleFilterChange}>
           <option value="">Default</option>
           <option value="price_low_to_high">Price: Low to High</option>
           <option value="price_high_to_low">Price: High to Low</option>
           <option value="likes_high_to_low">Likes: High to Low</option>
         </select>

          </div>
        </div>

        {/* Items */}
        <div className="row">
          <ExploreItems
            items={items}
            loading={loading}
            visibleCount={visibleCount}
            onReachBottom={showMore}
          />
        </div>
      </section>
    </div>
  );
};

export default Explore;

