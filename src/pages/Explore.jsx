import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubHeader from "../images/subheader.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Explore = () => {
  const [sort, setSort] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  // Fetch items from API
  const fetchItems = async () => {
    setLoading(true);
    const url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllItems(data);
      setVisibleCount(8);
    } catch (err) {
      console.error("Failed to fetch explore items", err);
    } finally {
      setLoading(false);
      setTimeout(() => AOS.refresh(), 50);
    }
  };

  useEffect(() => {
    fetchItems();
    window.scrollTo(0, 0);

    AOS.init({
      duration: 700,
      easing: "ease-out",
      once: false,
    });
  }, []);

  // Sort items
  const sortItems = (items) => {
    if (!sort || sort === "null") return items;

    let sorted = [...items];

    if (sort === "price_low_to_high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high_to_low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }

    return sorted;
  };

  const shownItems = sortItems(allItems).slice(0, visibleCount);

  // Skeleton loaders
  const skeletons = Array.from({ length: 8 }).map((_, idx) => (
    <div key={idx} className="explore-card skeleton-card">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text small"></div>
    </div>
  ));

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);

    // Trigger animation refresh after new cards load
    setTimeout(() => AOS.refresh(), 50);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* HEADER */}
        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SORT + GRID */}
        <section aria-label="section">
          <div className="container">
            {/* SORTING */}
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="explore-filters dropdown-wrapper">
                  <select className="form-control" onChange={(e) => setSort(e.target.value)}>
                    <option value="null">Sort By</option>
                    <option value="price_low_to_high">Price: Low → High</option>
                    <option value="price_high_to_low">Price: High → Low</option>
                    <option value="likes_high_to_low">Likes: High → Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ITEMS GRID */}
            <div className="explore-grid">
              {loading
                ? skeletons
                : shownItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="explore-card"

                      // ⭐ AOS ANIMATION HERE ⭐
                      data-aos="fade-up"
                      data-aos-delay={(index % 8) * 50}
                      data-aos-duration="700"
                      data-aos-easing="ease-out-cubic"
                      data-aos-once="false"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img src={item.authorImage} className="lazy" alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="nft__item_wrap" data-aos="zoom-in">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* LOAD MORE */}
            {!loading && visibleCount < allItems.length && (
              <div className="text-center mt-4">
                <button className="load-more-btn" onClick={loadMore}>
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
