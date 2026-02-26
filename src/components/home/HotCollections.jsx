import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    className: "owl-theme",
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const startTime = Date.now();

      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      setData(data);

      // Ensure skeleton shows at least 1 second
      const elapsedTime = Date.now() - startTime;
      const minimumLoadTime = 1000; // 1 second
      const remainingTime = minimumLoadTime - elapsedTime;

      setTimeout(() => {
        setLoading(false);
      }, remainingTime > 0 ? remainingTime : 0);
    }

    getData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>

            <OwlCarousel {...settings}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="mx-auto item" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton
                            width={60}
                            height={60}
                            borderRadius={1000}
                          />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="40%" height={20} />
                          <Skeleton width="20%" height={20} />
                        </div>
                      </div>
                    </div>
                  ))
                : data.map((elem, index) => (
                    <div className="mx-auto item" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${elem.nftId}`}>
                            <img
                              src={elem.nftImage}
                              className="img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft_coll_pp">
                          <Link to={`/author/${elem.authorId}`}>
                            <img
                              className="pp-coll"
                              src={elem.authorImage}
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{elem.title}</h4>
                          </Link>
                          <span>{elem.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;