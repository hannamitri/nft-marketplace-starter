import { useEffect, useMemo, useState } from "react";
import Skeleton from "../UI/Skeleton";
import "../../css/styles/NewItems.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

function getVisibleCount() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 950) return 2;
  if (window.innerWidth <= 1250) return 3;

  return 4;
}

function formatTimeRemaining(expiryDate) {
  if (!expiryDate) {
    return null;
  }

  const difference = expiryDate - Date.now();

  if (difference <= 0) {
    return "Expired";
  }

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  const seconds = Math.floor(
    (difference % (1000 * 60)) / 1000
  );

  return `${hours}h ${minutes}m ${seconds}s`;
}

function NewItems() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] =
    useState(getVisibleCount);
  const [, setClock] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;

    async function fetchNewItems() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `New Items request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "The New Items API did not return an array."
          );
        }

        if (isMounted) {
          setItems(data);
          setCurrentIndex(0);
        }
      } catch (fetchError) {
        console.error(
          "Unable to load new items:",
          fetchError
        );

        if (isMounted) {
          setError(
            "We could not load the new items. Please refresh the page and try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchNewItems();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
      setCurrentIndex(0);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const maximumIndex = Math.max(
    items.length - visibleCount,
    0
  );

  const visibleItems = useMemo(() => {
    return items.slice(
      currentIndex,
      currentIndex + visibleCount
    );
  }, [items, currentIndex, visibleCount]);

  function showPreviousItems() {
    setCurrentIndex((previousIndex) =>
      Math.max(previousIndex - 1, 0)
    );
  }

  function showNextItems() {
    setCurrentIndex((previousIndex) =>
      Math.min(previousIndex + 1, maximumIndex)
    );
  }

  return (
    <section
      className="new-items-section"
      aria-labelledby="new-items-title"
    >
      <div className="new-items-container">
        <div className="new-items-heading">
          <h2 id="new-items-title">
            New Items
          </h2>

          <span
            className="new-items-heading-line"
            aria-hidden="true"
          ></span>
        </div>

        {error ? (
          <p
            className="new-items-error"
            role="alert"
          >
            {error}
          </p>
        ) : (
          <div className="new-items-carousel">
            {!isLoading && items.length > visibleCount && (
              <button
                className="new-items-arrow new-items-arrow-left"
                type="button"
                aria-label="Show previous new items"
                onClick={showPreviousItems}
                disabled={currentIndex === 0}
              >
                &#8249;
              </button>
            )}

            <div className="new-items-card-grid">
              {isLoading
                ? Array.from({
                    length: visibleCount,
                  }).map((_, index) => (
                    <Skeleton
                      key={`new-item-skeleton-${index}`}
                    />
                  ))
                : visibleItems.map((item) => {
                    const timeRemaining =
                      formatTimeRemaining(
                        item.expiryDate
                      );

                    return (
                      <article
                        className="new-item-card"
                        key={item.id}
                      >
                        <div className="new-item-card-top">
                          <div className="new-item-author">
                            <img
                              src={item.authorImage}
                              alt=""
                            />

                            <span
                              className="new-item-verified"
                              aria-label="Verified creator"
                            >
                              ✓
                            </span>
                          </div>

                          {timeRemaining && (
                            <span className="new-item-timer">
                              {timeRemaining}
                            </span>
                          )}
                        </div>

                        <div className="new-item-image-wrapper">
                          <img
                            className="new-item-image"
                            src={item.nftImage}
                            alt={item.title}
                            loading="lazy"
                          />
                        </div>

                        <div className="new-item-content">
                          <h3>{item.title}</h3>

                          <div className="new-item-details">
                            <span className="new-item-price">
                              {Number(
                                item.price
                              ).toFixed(2)}{" "}
                              ETH
                            </span>

                            <span
                              className="new-item-likes"
                              aria-label={`${item.likes} likes`}
                            >
                              <span aria-hidden="true">
                                ♥
                              </span>

                              {item.likes}
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
            </div>

            {!isLoading && items.length > visibleCount && (
              <button
                className="new-items-arrow new-items-arrow-right"
                type="button"
                aria-label="Show more new items"
                onClick={showNextItems}
                disabled={
                  currentIndex === maximumIndex
                }
              >
                &#8250;
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewItems;
