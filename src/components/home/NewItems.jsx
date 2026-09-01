import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch new items");
        }

        const data = await response.json();

        setItems(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex + itemsPerPage >= items.length
        ? 0
        : previousIndex + itemsPerPage
    );
  };

  const previousSlide = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex - itemsPerPage < 0
        ? Math.floor((items.length - 1) / itemsPerPage) *
          itemsPerPage
        : previousIndex - itemsPerPage
    );
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
            <p>Loading items...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="650"
            >
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="home-carousel">
          {items.length > itemsPerPage && (
            <button
              type="button"
              className="home-carousel-arrow home-carousel-arrow-left"
              onClick={previousSlide}
              aria-label="Show previous new items"
            >
              ‹
            </button>
          )}

          <div className="row">
            {items
              .slice(
                currentIndex,
                currentIndex + itemsPerPage
              )
              .map((item, index) => (
                <NewItemCard
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
          </div>

          {items.length > itemsPerPage && (
            <button
              type="button"
              className="home-carousel-arrow home-carousel-arrow-right"
              onClick={nextSlide}
              aria-label="Show next new items"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const NewItemCard = ({ item, index }) => {
  const [timeLeft, setTimeLeft] = useState(
    item.expiryDate
      ? Math.max(
          new Date(item.expiryDate).getTime() - Date.now(),
          0
        )
      : 0
  );

  useEffect(() => {
    if (!item.expiryDate) {
      return;
    }

    const interval = setInterval(() => {
      const remaining =
        new Date(item.expiryDate).getTime() - Date.now();

      setTimeLeft(Math.max(remaining, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [item.expiryDate]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
      data-aos="fade-up"
      data-aos-duration="650"
      data-aos-delay={(index % 4) * 100}
      data-aos-offset="100"
      data-aos-once="true"
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Creator: ${item.authorName || "Unknown"}`}
          >
            <img
              className="lazy"
              src={item.authorImage}
              alt={item.authorName || "NFT creator"}
            />

            <i className="fa fa-check"></i>
          </Link>
        </div>

        {item.expiryDate && timeLeft > 0 && (
          <div className="de_countdown">
            {formatTime(timeLeft)}
          </div>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button type="button">
                Buy Now
              </button>

              <div className="nft__item_share">
                <h4>Share</h4>

                <button
                  type="button"
                  className="share-icon-button"
                  aria-label="Share on Facebook"
                >
                  <i className="fa fa-facebook fa-lg"></i>
                </button>

                <button
                  type="button"
                  className="share-icon-button"
                  aria-label="Share on Twitter"
                >
                  <i className="fa fa-twitter fa-lg"></i>
                </button>

                <button
                  type="button"
                  className="share-icon-button"
                  aria-label="Share by email"
                >
                  <i className="fa fa-envelope fa-lg"></i>
                </button>
              </div>
            </div>
          </div>

          <Link to="/item-details">
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt={item.title}
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">
            {item.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItems;
