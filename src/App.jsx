import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Explore from "./pages/Explore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const skeletonCards = Array.from({ length: 4 });
function PrevArrow({ onClick }) {
  return (
    <button
      className="carousel-arrow carousel-arrow-left"
      onClick={onClick}
      aria-label="Previous"
    >
      ‹
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      className="carousel-arrow carousel-arrow-right"
      onClick={onClick}
      aria-label="Next"
    >
      ›
    </button>
  );
}

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="loading-dot"
            style={{ "--i": index }}
          ></span>
        ))}
      </div>
    </div>
  );
}

function CountdownTimer({ expiryDate }) {
  const calculateTimeLeft = () => {
    const difference = expiryDate - Date.now();

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="countdown-timer">
      {String(timeLeft.hours).padStart(2, "0")}:
      {String(timeLeft.minutes).padStart(2, "0")}:
      {String(timeLeft.seconds).padStart(2, "0")}
    </div>
  );
}

function App() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

const [newItems, setNewItems] = useState([]);
const [newItemsLoading, setNewItemsLoading] = useState(true);

const [topSellers, setTopSellers] = useState([]);
const [topSellersLoading, setTopSellersLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      )
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((response) => {
        console.log("New Items:", response.data);
        setNewItems(response.data);
      })
      .catch((error) => {
        console.error("New Items API error:", error);
      })
      .finally(() => {
        setNewItemsLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 250,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

const HomeContent = () => (
  <>
    <div className="section-title">Hot Collections</div>

    <div className="collections-container">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Slider {...settings}>
          {collections.map((collection) => (
            <div key={collection.id}>
              <div className="collection-card">
                <div className="nft-image-wrapper">
                  <img
                    className="nft-image"
                    src={collection.nftImage}
                    alt={collection.title}
                  />
                </div>

                <img
                  className="author-image"
                  src={collection.authorImage}
                  alt="Author"
                />

                <h2>{collection.title}</h2>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>

    <section className="new-items-section">
      <div className="section-title">New Items</div>

      <div className="collections-container">
        <Slider {...settings}>
          {newItemsLoading
            ? skeletonCards.map((_, index) => (
                <div key={index}>
                  <div className="collection-card skeleton-card">
                    <div className="skeleton-nft"></div>
                    <div className="skeleton-author"></div>
                    <div className="skeleton-title"></div>
                  </div>
                </div>
              ))
            : newItems.map((item) => (
                <div key={item.id}>
                  <div className="collection-card new-item-card">
                    <div className="new-item-top">
                      <img
                        className="new-item-author"
                        src={item.authorImage}
                        alt="Author"
                      />

                      <div className="countdown-wrapper">
                        <CountdownTimer expiryDate={item.expiryDate} />
                      </div>
                    </div>

                    <div className="nft-image-wrapper">
                      <img
                        className="nft-image"
                        src={item.nftImage}
                        alt={item.title}
                      />
                    </div>

                    <div className="new-item-info">
                      <h2>{item.title}</h2>

                      <div className="new-item-bottom-row">
                        <p className="item-price">
                          {item.price} ETH
                        </p>

                        <p className="item-likes">
                          ♥ {item.likes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>

    <section className="top-sellers-section">
      <div className="section-title">Top Sellers</div>

      <ol className="top-sellers-list">
        {topSellersLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <li className="top-seller-item" key={index}>
                <span className="top-seller-number">
                  {index + 1}
                </span>

                <div className="top-seller-image skeleton-seller-image"></div>

                <div className="top-seller-info">
                  <div className="skeleton-seller-name"></div>
                  <div className="skeleton-seller-price"></div>
                </div>
              </li>
            ))
          : topSellers.slice(0, 12).map((seller, index) => (
              <li className="top-seller-item" key={seller.id}>
                <span className="top-seller-number">
                  {index + 1}
                </span>

                <Link
                  to={`/author/${seller.authorId}`}
                  className="top-seller-image-link"
                >
                  <img
                    className="top-seller-image"
                    src={seller.authorImage}
                    alt={seller.authorName}
                  />
                </Link>

                <div className="top-seller-info">
                  <Link
                    to={`/author/${seller.authorId}`}
                    className="top-seller-name"
                  >
                    {seller.authorName}
                  </Link>

                  <span className="top-seller-price">
                    {seller.price} ETH
                  </span>
                </div>
              </li>
            ))}
      </ol>
    </section>
  </>
);

return (
  <Router>
    <Nav />

    <main>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
    </main>

    <Footer />
  </Router>
);
}

export default App;
