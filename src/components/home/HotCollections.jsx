import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import axios from 'axios';

const HotCollections = () => {

  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const [slideRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 6 },
    breakpoints: {
      "(min-width: 576px)": { slides: { perView: 2, spacing: 6 } },
      "(min-width: 768px)": { slides: { perView: 3, spacing: 6 } },
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 6 } },
    },
  });

  async function fetchdata() {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
      setCollection(data);
    } catch (err) {
      console.error("Failed to fetch collections:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdata();
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

          {loading ? (
            <div className="d-flex gap-2">
              {new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap placeholder-glow">
                      <span className="placeholder w-100" style={{ height: "200px", display: "block" }} />
                    </div>
                    <div className="nft_coll_pp placeholder-glow">
                      <span className="placeholder rounded-circle" style={{ width: "50px", height: "50px", display: "block" }} />
                    </div>
                    <div className="nft_coll_info placeholder-glow">
                      <span className="placeholder w-75 mb-2" style={{ display: "block" }} />
                      <span className="placeholder w-50" style={{ display: "block" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: "relative" }}>

              <button
                onClick={() => instanceRef.current?.prev()}
                className="btn btn-light rounded-circle position-absolute top-50 translate-middle-y"
                style={{ left: "2px", zIndex: 1, width: "50px", height: "50px", transition: "transform 0.2s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.2)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >◀</button>

              <div ref={slideRef} className="keen-slider">
                {collection.map((item, index) => (
                  <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => instanceRef.current?.next()}
                className="btn btn-light rounded-circle position-absolute top-50 translate-middle-y"
                style={{ right: "2px", zIndex: 1, width: "50px", height: "50px", transition: "transform 0.2s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.2)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >▶</button>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HotCollections;