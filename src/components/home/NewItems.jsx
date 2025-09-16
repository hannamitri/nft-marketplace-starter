import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import NftCard from "../UI/NftCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/HotCollections.css";
// import CountdownTimer from "../CountdownTimer";

const NewItems = () => {
  const isMounted = useRef(true);
  const [data, setData] = useState([]); //starting as empty [] -> .slice and .map never break
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        if (isMounted.current) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div data-aos="fade-in" className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-12 slider__container">
              <Slider {...settings}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="8px"
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton
                          width="40px"
                          height="40px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton
                          width="80%"
                          height="20px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="60%"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="text-center">
        <p>Error: {error.message}</p>
      </section>
    );
  }
  return (
    <>
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div data-aos="fade-in" className="row">
            <div className="col-lg-12 text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>

            {data.length > 0 && (
              <div className="col-12 slider__container">
                <Slider {...settings}>
                  {data.slice(0, 6).map((item) => (
                    <div key={item.nftId}>
                      <NftCard item={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewItems;
