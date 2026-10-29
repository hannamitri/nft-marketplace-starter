import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

//  --- SUB-COMPONENT FOR OPTIMIZED COUNTDOWN ---

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTime = () => {
      const difference = new Date(expiryDate) - new Date();

      if (difference <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime(); // Run instantly on mount
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate || timeLeft === "Expired") return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

// --- MAIN NEW ITEMS COMPONENT ---
const NewItems = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // 2. Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation speed
      once: true,     // Animate only once while scrolling down
    });
  }, []);

  // 3. Refresh AOS calculations whenever the DOM updates out of the loading state
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?userId${id}`);
      setPosts(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchNewItems();
  }, [id]);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
    },
  };

  return (
    <>
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            {/* 4. Added AOS fade-up to the section header */}
            <div className="col-lg-12" data-aos="fade-up">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            {loading ? (
              <>
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12"
                    key={`item-skeleton-${index}`}
                  >
                    <div className="nft__item" style={{ position: "relative" }}>
                      <div className="author_list_pp" style={{ zIndex: 2 }}>
                        <div
                          className="skeleton-loading"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#eee",
                          }}
                        ></div>
                      </div>

                      <div className="nft__item_wrap">
                        <div
                          className="skeleton-loading nft__item_preview"
                          style={{
                            width: "100%",
                            height: "100px",
                            borderRadius: "8px",
                            backgroundColor: "#eee",
                          }}
                        ></div>
                      </div>

                      <div
                        className="nft__item_info"
                        style={{ marginTop: "15px" }}
                      >
                        <div
                          className="skeleton-loading"
                          style={{
                            width: "70%",
                            height: "18px",
                            backgroundColor: "#eee",
                            borderRadius: "4px",
                            marginBottom: "10px",
                          }}
                        ></div>

                        <div
                          className="skeleton-loading"
                          style={{
                            width: "40%",
                            height: "14px",
                            backgroundColor: "#eee",
                            borderRadius: "4px",
                          }}
                        ></div>

                        <div
                          className="nft__item_like skeleton-loading"
                          style={{
                            width: "35px",
                            height: "15px",
                            backgroundColor: "#eee",
                            borderRadius: "4px",
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* 5. Added AOS fade-up properties to the carousel wrapper div */
              <div className="col-lg-12" data-aos="fade-up" data-aos-delay="150">
                {posts.length > 0 && (
                  <OwlCarousel className="owl-theme" {...options}>
                    {posts.map((post, index) => (
                      <div className="nft__item" key={post.id || index}>
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${post.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${post.title}`}
                          >
                            <img
                              className="lazy"
                              src={post.authorImage || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <Countdown expiryDate={post.expiryDate} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <Link to='/author' target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </Link>
                                <Link to='/author' target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </Link>
                                <Link to='/author'>
                                  <i className="fa fa-envelope fa-lg"></i>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${post.nftId}`}>
                            <img
                              src={post.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${post.nftId}`}>
                            <h4>{post.title}</h4>
                          </Link>
                          <div className="nft__item_price">{post.price}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewItems;
