import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start" });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      const data = await res.json();
      setItems(Array.isArray(data) ? data.slice(0, 6) : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const next = useCallback(() => embla && embla.scrollNext(), [embla]);

  const list = loading ? new Array(4).fill(null) : items;

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

          <div className="col-lg-12">
            <div className="hot-collections">
              {/* Embla viewport */}
              <div ref={viewportRef} className="embla" style={{ overflow: "hidden" }}>
                <div className="embla__container" style={{ display: "flex", gap: "24px" }}>
                  {list.map((n, index) => {
                    if (loading) {
                      return (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12 embla__slide"
                          style={{ flex: "0 0 25%" }}
                          key={index}
                        >
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <div
                                className="lazy img-fluid"
                                style={{
                                  width: "100%",
                                  paddingTop: "100%",
                                  background: "#eee",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                            <div className="nft_coll_pp">
                              <div
                                className="lazy pp-coll"
                                style={{
                                  width: 50,
                                  height: 50,
                                  background: "#eee",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                            <div className="nft_coll_info">
                              <h4>&nbsp;</h4>
                              <span>&nbsp;</span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    const toItem = `/item-details/${n.nftId}`;
                    const toAuthor = `/author/${n.authorId}`;
                    const coverSrc = n.nftImage || "";
                    const avatarSrc = n.authorImage || "";
                    const title = n.title || "Collection";
                    const code = n.code ? `ERC-${n.code}` : "ERC-192";

                    return (
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12 embla__slide"
                        style={{ flex: "0 0 25%" }}
                        key={n.id ?? index}
                      >
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={toItem}>
                              <img src={coverSrc} className="lazy img-fluid" alt="" />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={toAuthor}>
                              <img className="lazy pp-coll" src={avatarSrc} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to={toItem}>
                              <h4>{title}</h4>
                            </Link>
                            <span>{code}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Side arrows (outside the cards) */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="carousel-nav prev"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="carousel-nav next"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
