import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const MemoOwlCarousel = React.memo(OwlCarousel);

const SkeletonSlide = () => (
  <div className="item">
    <div
      style={{
        width: "100%",
        textAlign: "center",
        paddingBottom: "60px", 
      }}
    >
      <div
        style={{
          width: "100%",
          paddingTop: "100%",
          position: "relative",
          borderRadius: "10px",
          backgroundColor: "#eee",
          overflow: "visible",
        }}
      ></div>
      <div
        style={{
          marginTop: "30px",
          height: "20px",
          background: "#ddd",
          width: "60%",
          margin: "10px auto",
        }}
      ></div>
      <div
        style={{
          height: "15px",
          background: "#ddd",
          width: "40%",
          margin: "5px auto",
        }}
      ></div>
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => {
        setCollections(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  useEffect(() => {
    const adjustArrows = () => {
      const prev = document.querySelector(".owl-prev");
      const next = document.querySelector(".owl-next");

      if (prev && next) {
        prev.style.position = "absolute";
        prev.style.left = "-35px"; 
        prev.style.top = "50%";
        prev.style.transform = "translateY(-50%)";
        prev.style.background = "rgba(0,0,0,0.5)";
        prev.style.borderRadius = "50%";
        prev.style.padding = "10px";

        next.style.position = "absolute";
        next.style.right = "-35px"; 
        next.style.top = "50%";
        next.style.transform = "translateY(-50%)";
        next.style.background = "rgba(0,0,0,0.5)";
        next.style.borderRadius = "50%";
        next.style.padding = "10px";
      }
    };

    const timeout = setTimeout(adjustArrows, 50);
    return () => clearTimeout(timeout);
  }, [collections]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="col-lg-12">
          <div data-aos="fade-up" data-aos-delay="200" className="text-center">
            <h2 >Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: "flex", gap: "10px" }}>
            {[...Array(4)].map((_, index) => (
              <SkeletonSlide key={index} />
            ))}
          </div>
        ) : (
          <MemoOwlCarousel className="owl-theme" {...carouselOptions}>
            {collections.map((item) => (
              <div data-aos="fade-up" data-aos-delay="200" className="item" key={item.id}>
                <div
                  className="nft_coll"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    paddingBottom: "30px", 
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      overflow: "visible",
                      borderRadius: "10px",
                    }}
                  >
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          borderRadius: "10px",
                        }}
                      />
                    </Link>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-20px", 
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 2,
                      }}
                    >
                      <Link
                        to={`/author/${item.authorId}`}
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={item.authorImage}
                          alt={item.title}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "3px solid #fff",
                            objectFit: "cover",
                          }}
                        />
                        <i
                          className="fa fa-check"
                          style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            color: "#fff",
                            background: "#8364e2",
                            borderRadius: "50%",
                            fontSize: "12px",
                            padding: "2px",
                            transform: "translate(25%, 25%)",
                          }}
                        ></i>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="nft_coll_info"
                    style={{ marginTop: "30px", textAlign: "center" }}
                  >
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span style={{ color: "#777" }}>ERC-{item.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </MemoOwlCarousel>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
