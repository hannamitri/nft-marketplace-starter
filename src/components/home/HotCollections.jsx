import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../../../src/css/styles/hot-collections.css";
import leftArrow from "../../images/left__arrow.png"
import rightArrow from "../../images/right__arrow.png"

const HotCollections = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },

    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 3,
          spacing: 12,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
  });

  const showSlider = !loading && users.length > 0;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const getUsers = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setUsers(getUsers.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider__wrapper">
            {showSlider && (
              <button
                className="arrow arrow-left"
                onClick={() => instanceRef.current?.prev()}
              >
                ➩
                {/* <img src={leftArrow} alt="" className="arrow__imgs arrow__left--img"/> */}
              </button>
            )}
            {loading ? (
              <div className="nft__loading--container">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="nft_coll nft_coll--loading" key={index}>
                    <div className="nft_wrap">
                      <div className="nft__img--loading skeleton"></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="nft__author-img--loading skeleton"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <div className="nft__title--loading skeleton"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="empty-state">No collections found.</div>
            ) : (
              <div ref={sliderRef} className="keen-slider">
                {users.map((user) => (
                  <div className="keen-slider__slide" key={user.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${user.nftId}`}>
                          <img
                            src={user.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${user.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={user.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{user.title}</h4>
                        </Link>
                        <span>ERC-{user.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showSlider && (
              <button
                className="arrow arrow-right"
                onClick={() => instanceRef.current?.next()}
              >
                ➩
                {/* <img src={rightArrow} alt="" className="arrow__imgs arrow__right--img"/> */}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HotCollections;
