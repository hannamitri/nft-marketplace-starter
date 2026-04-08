import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const AuthorItems = ({ items = [], loading = false }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredItems = useMemo(() => {
    let updatedItems = [...items];

    if (activeTab === "available") {
      updatedItems = updatedItems.filter((item) => Number(item.price) > 0);
    }

    if (activeTab === "liked") {
      updatedItems = updatedItems.filter((item) => Number(item.likes) > 50);
    }

    return updatedItems;
  }, [items, activeTab]);

  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(8);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="items_filter">
      <ul className="de_nav">
        <li className={activeTab === "all" ? "active" : ""}>
          <span onClick={() => handleTabChange("all")}>All</span>
        </li>
        <li className={activeTab === "available" ? "active" : ""}>
          <span onClick={() => handleTabChange("available")}>Available</span>
        </li>
        <li className={activeTab === "liked" ? "active" : ""}>
          <span onClick={() => handleTabChange("liked")}>Most Liked</span>
        </li>
      </ul>

      <div className="spacer-single"></div>

      <div className="row">
        {loading
          ? [...Array(8)].map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                key={index}
              >
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <div
                      className="skeleton skeleton-img"
                      style={{
                        width: "100%",
                        height: "280px",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>

                  <div className="nft__item_info" style={{ marginTop: "12px" }}>
                    <div
                      className="skeleton skeleton-text short"
                      style={{
                        height: "22px",
                        marginBottom: "10px",
                      }}
                    ></div>
                    <div
                      className="skeleton skeleton-text"
                      style={{
                        height: "18px",
                        width: "90px",
                        marginBottom: "10px",
                      }}
                    ></div>
                    <div
                      className="skeleton skeleton-text"
                      style={{
                        height: "18px",
                        width: "70px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          : visibleItems.map((item, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                key={item.nftId || item.id || index}
              >
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId || item.nft_id}`}>
                      <Skeleton
                        src={item.nftImage || item.nft_image}
                        alt={item.title}
                        className="lazy nft__item_preview"
                        wrapperStyle={{
                          height: "280px",
                          borderRadius: "8px",
                        }}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId || item.nft_id}`}>
                      <h4>{item.title}</h4>
                    </Link>

                    <div className="nft__item_price">
                      {Number(item.price).toFixed(2)} ETH
                    </div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && visibleCount < filteredItems.length && (
        <div className="text-center mt-4">
          <button className="btn-main" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorItems;
