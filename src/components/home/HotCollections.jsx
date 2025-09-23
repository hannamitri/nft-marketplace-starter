import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start" });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      const data = await res.json();
      setItems(Array.isArray(data) ? data.slice(0, 6) : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const prev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const next = useCallback(() => embla && embla.scrollNext(), [embla]);

  const list = loading ? new Array(6).fill(null) : items;

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
              <div ref={viewportRef} className="embla" style={{ overflow: "hidden" }}>
                <div className="embla__container" style={{ display: "flex" }}>
                  {list.map((n, i) => {
                    if (loading) {
                      return (
                        <div key={`s-${i}`} className="embla__slide col-lg-3 col-md-4 col-sm-6 col-12">
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <div className="skeleton-box sk-cover" />
                            </div>
                            <div className="nft_coll_pp">
                              <div className="skeleton-box sk-avatar" />
                            </div>
                            <div className="nft_coll_info">
                              <div className="skeleton-box sk-line sk-title" />
                              <div className="skeleton-box sk-line sk-sub" />
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={n.id ?? i} className="embla__slide col-lg-3 col-md-4 col-sm-6 col-12">
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${n.nftId}`}>
                              <img src={n.nftImage || ""} className="lazy img-fluid" alt="" />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${n.authorId}`}>
                              <img className="lazy pp-coll" src={n.authorImage || ""} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to={`/item-details/${n.nftId}`}>
                              <h4>{n.title || "Collection"}</h4>
                            </Link>
                            <span>{n.code ? `ERC-${n.code}` : "ERC-192"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button type="button" onClick={prev} aria-label="Previous" className="carousel-nav prev">‹</button>
              <button type="button" onClick={next} aria-label="Next" className="carousel-nav next">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;


