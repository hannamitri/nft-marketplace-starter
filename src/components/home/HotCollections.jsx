import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./HotCollections.css";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

function formatErcCode(value) {
  if (value === null || value === undefined) return "ERC-—";
  const str = String(value).trim();
  if (!str) return "ERC-—";
  return str.toUpperCase().startsWith("ERC-") ? str.toUpperCase() : `ERC-${str}`;
}

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      slides: { perView: 4, spacing: 16 },
      breakpoints: {
        "(max-width: 1200px)": { slides: { perView: 3, spacing: 16 } },
        "(max-width: 992px)": { slides: { perView: 2, spacing: 14 } },
        "(max-width: 576px)": { slides: { perView: 1, spacing: 12 } },
      },
    },
    []
  );

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await axios.get(API_URL);
        setCollections(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Could not load hot collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  useEffect(() => {
    if (instanceRef.current) instanceRef.current.update();
  }, [collections, instanceRef]);

  const isReady = !loading && !err && collections.length > 0;

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

          {}
          {loading && (
            <div className="col-12">
              <div className="hot-collections-skeleton">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="hc-skel-card" key={i} />
                ))}
              </div>
            </div>
          )}

          {}
          {!loading && err && (
            <div className="col-12 text-center">
              <p>{err}</p>
            </div>
          )}

          {}
          {isReady && (
            <div className="col-12">
              <div className="hot-collections-carousel">
                <button
                  type="button"
                  className="hc-arrow hc-arrow--left"
                  aria-label="Previous"
                  disabled={!isReady}
                  onClick={() => instanceRef.current?.prev()}
                >
                  ‹
                </button>

                <div ref={sliderRef} className="keen-slider">
                  {collections.map((item, index) => {
                    const nftId = item.nftId ?? item.id ?? String(index);
                    const title = item.title ?? item.name ?? "Untitled Collection";

                    const rawCode =
                      item.code ?? item.blockchain ?? item.chain ?? item.erc ?? "";
                    const code = formatErcCode(rawCode);

                    const imageSrc =
                      item.nftImage ??
                      item.image ??
                      item.cover ??
                      item.banner ??
                      nftImage;

                    const authorSrc =
                      item.authorImage ??
                      item.creatorImage ??
                      item.profileImage ??
                      AuthorImage;

                    return (
                      <div className="keen-slider__slide" key={nftId}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            {}
                            <Link
                              to={`/item-details/${nftId}`}
                              state={{ previewImage: imageSrc, previewTitle: title }}
                            >
                              <img
                                src={imageSrc}
                                className="lazy img-fluid"
                                alt={title}
                              />
                            </Link>
                          </div>

                          <div className="nft_coll_pp">
                            <Link to="/author">
                              <img
                                className="lazy pp-coll"
                                src={authorSrc}
                                alt="author"
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>

                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{title}</h4>
                            </Link>
                            <span>{code}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="hc-arrow hc-arrow--right"
                  aria-label="Next"
                  disabled={!isReady}
                  onClick={() => instanceRef.current?.next()}
                >
                  ›
                </button>
              </div>
            </div>
          )}

          {!loading && !err && collections.length === 0 && (
            <div className="col-12 text-center">
              <p>No collections found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
