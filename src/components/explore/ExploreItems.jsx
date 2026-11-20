import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../UI/NFTCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH EXPLORE ITEMS FROM API
  useEffect(() => {
    const controller = new AbortController();

    const fetchExploreItems = async () => {
      setLoading(true);
      setError(null);
      setVisibleItems(8);

      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
          {
            params: filter ? { filter } : {},
            signal: controller.signal,
          }
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid Explore API response");
        }

        if (!controller.signal.aborted) {
          setItems(response.data);
        }
      } catch (err) {
        if (
          err.code === "ERR_CANCELED" ||
          err.name === "CanceledError"
        ) {
          return;
        }

        console.error("Error fetching Explore items:", err);

        if (!controller.signal.aborted) {
          setError("Unable to load NFTs. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchExploreItems();

    return () => controller.abort();
  }, [filter]);

  // HANDLE FILTER CHANGE
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // LOAD 4 MORE NFTs
  const handleLoadMore = () => {
    setVisibleItems((previous) =>
      Math.min(previous + 4, items.length)
    );
  };

  // SKELETON LOADING CARD
  const SkeletonCard = () => (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div
        className="nft__item"
        style={{ minHeight: "350px" }}
      >
        {/* Skeleton Author Image */}
        <div className="author_list_pp">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#e5e5e5",
            }}
          />
        </div>

        {/* Skeleton NFT Image */}
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#e5e5e5",
            borderRadius: "8px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        />

        {/* Skeleton NFT Title */}
        <div
          style={{
            width: "80%",
            height: "18px",
            backgroundColor: "#e5e5e5",
            borderRadius: "4px",
            marginBottom: "12px",
          }}
        />

        {/* Skeleton NFT Price */}
        <div
          style={{
            width: "40%",
            height: "15px",
            backgroundColor: "#e5e5e5",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* FILTER DROPDOWN */}
      <div className="col-md-12">
        <select
          id="filter-items"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Default</option>

          <option value="price_low_to_high">
            Price, Low to High
          </option>

          <option value="price_high_to_low">
            Price, High to Low
          </option>

          <option value="likes_high_to_low">
            Most liked
          </option>
        </select>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="col-md-12 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* SKELETON LOADING */}
      {loading &&
        Array.from({ length: 8 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}

      {/* DYNAMIC NFT CARDS USING REUSABLE COMPONENT */}
      {!loading &&
        !error &&
        items.slice(0, visibleItems).map((item, index) => (
          <div
            key={item.id || item.nftId || index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{
              display: "block",
              backgroundSize: "cover",
            }}
          >
            {/* Reusable NFT Card */}
            <NFTCard
              item={item}
              showShare={true}
            />
          </div>
        ))}

      {/* EMPTY STATE */}
      {!loading && !error && items.length === 0 && (
        <div className="col-md-12 text-center">
          <p>No NFTs available.</p>
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {!loading &&
        !error &&
        visibleItems < items.length && (
          <div className="col-md-12 text-center">
            <button
              type="button"
              id="loadmore"
              className="btn-main lead"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          </div>
        )}
    </>
  );
};

export default ExploreItems;