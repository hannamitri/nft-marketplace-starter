import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import AOS from "aos";
import "aos/dist/aos.css";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

 useEffect(() => {
  if (!loading) {
    AOS.refreshHard();
  }  }, [loading, items]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        console.log("EXPLORE API:", response.data);
        setItems(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let updatedItems = [...items];

    if (statusFilter === "hasCountdown") {
      updatedItems = updatedItems.filter((item) => item.expiryDate);
    }

    if (statusFilter === "noCountdown") {
      updatedItems = updatedItems.filter((item) => !item.expiryDate);
    }

    if (sortBy === "priceLow") {
      updatedItems.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHigh") {
      updatedItems.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "mostLiked") {
      updatedItems.sort((a, b) => b.likes - a.likes);
    }

    if (sortBy === "titleAZ") {
      updatedItems.sort((a, b) => a.title.localeCompare(b.title));
    }

    return updatedItems;
  }, [items, statusFilter, sortBy]);

  useEffect(() => {
    setVisibleCount(8);
  }, [statusFilter, sortBy]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <h1>Explore</h1>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            {/* FILTER ROW */}
            <div className="row mb-4">
              <div className="col-md-6 mb-sm-20">
                <select
                  className="form-control"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Items</option>
                  <option value="hasCountdown">Has Countdown</option>
                  <option value="noCountdown">No Countdown</option>
                </select>
              </div>

              <div className="col-md-6 text-md-end">
                <select
                  className="form-control"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="mostLiked">Most Liked</option>
                  <option value="titleAZ">Title: A-Z</option>
                </select>
              </div>
            </div>

            <div className="row">
              <ExploreItems
                items={filteredAndSortedItems.slice(0, visibleCount)}
                loading={loading}
              />
            </div>

            {!loading && visibleCount < filteredAndSortedItems.length && (
              <div className="text-center mt-4">
                <button className="btn-main" onClick={loadMore}>
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
