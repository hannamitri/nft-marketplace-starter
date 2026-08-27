import React, { useEffect, useState } from "react";
import SellerCards from "../UI/SellerCards";
import "./ExploreItems.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ExploreItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        const data = await response.json();

        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  function getTimeRemaining(expiryDate) {
    const expiryTime = new Date(expiryDate).getTime();
    const difference = expiryTime - currentTime;

    if (difference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  const sortedCollections = [...collections].sort((a, b) => {
    if (filter === "price_low_to_high") {
      return Number(a.price) - Number(b.price);
    }

    if (filter === "price_high_to_low") {
      return Number(b.price) - Number(a.price);
    }

    if (filter === "likes_high_to_low") {
      return Number(b.likes) - Number(a.likes);
    }

    return 0;
  });

  function loadMore() {
    setVisibleItems((previousItems) => previousItems + 4);
  }

  AOS.init();

  return (
    <>
     <div data-aos="fade-up">
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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

      {loading ? (
        <div className="skeleton__collections">
          {[1, 2, 3, 4].map((item) => (
            <div className="skeleton__card" key={item}>
              <div className="skeleton skeleton__image"></div>

              <div className="skeleton__profile-wrapper">
                <div className="skeleton skeleton__profile"></div>
              </div>

              <div className="skeleton skeleton__title"></div>
              <div className="skeleton skeleton__text"></div>
              <div className="skeleton skeleton__text skeleton__text--small"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="row">
            {sortedCollections
              .slice(0, visibleItems)
              .map((data, index) => {
                const timeRemaining = data.expiryDate
                  ? getTimeRemaining(data.expiryDate)
                  : null;

                return (
                  <SellerCards
                    key={data.id || index}
                    data={data}
                    timeRemaining={timeRemaining}
                  />
                );
              })}
          </div>

          {visibleItems < sortedCollections.length && (
            <div className="col-md-12 text-center">
              <button
                id="loadmore"
                className="btn-main lead"
                onClick={loadMore}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default ExploreItems;