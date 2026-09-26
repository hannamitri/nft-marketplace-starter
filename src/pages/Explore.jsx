import React, { useState, useEffect } from "react";
import AOS from "aos";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import useExploreItems from "../hooks/useExploreItems";

const Explore = () => {
  const [filter, setFilter] = useState("");
  const { items, loading, visibleCount, showMore } = useExploreItems(filter);

  // Refresh AOS whenever data finishes loading or filter changes
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        AOS.refreshHard();
      }, 150);
    }
  }, [loading, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="explore">
      {/* Subheader Header */}
      <section className="jumbotron breadcumb no-bg" data-aos="fade-up">
        <div className="mainbreadcumb">
          <img src={SubHeader} alt="Subheader" />
          <h1 className="text-center">Explore</h1>
        </div>
      </section>

      {/* Filters & Items Container */}
      <section className="container">
        <div className="row mb-4">
          <div className="col-md-3">
            <select className="form-select" onChange={handleFilterChange} value={filter}>
              <option value="">Default</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
              {/* Corrected option value below */}
              <option value="likes_high_to_low">Likes: Most Liked</option>
            </select>
          </div>
        </div>

        {/* Dynamic Explore Items Container */}
        <div className="row" data-aos="fade-up">
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

