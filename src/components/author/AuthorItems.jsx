import React, { useState } from "react";
import NFTCard from "../common/NFTCard";

const AuthorItems = ({ items, loading }) => {
  const safeItems = items || [];
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  const visibleItems = safeItems.slice(0, visibleCount);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="skeleton skeleton-img" style={{ width: "100%", height: "300px" }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div className="skeleton skeleton-title" style={{ width: "70%", marginBottom: "10px" }}></div>
                    <div className="skeleton skeleton-text" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {visibleItems.map((item, index) => (
                <NFTCard key={index} item={item} variant="grid" />
              ))}
              {visibleItems.length < safeItems.length && (
                <div className="col-md-12 text-center" style={{ marginTop: "20px" }}>
                  <button className="btn-main lead" onClick={handleLoadMore}>
                    More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
