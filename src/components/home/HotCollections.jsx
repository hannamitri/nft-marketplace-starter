import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "./HotCollections.css";

const COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const CollectionArrow = ({ className, onClick, direction }) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
    disabled={!onClick}
    aria-label={`${direction === "previous" ? "Previous" : "Next"} collections`}
  >
    <span aria-hidden="true">{direction === "previous" ? "‹" : "›"}</span>
  </button>
);

const sliderSettings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <CollectionArrow direction="previous" />,
  nextArrow: <CollectionArrow direction="next" />,
  responsive: [
    { breakpoint: 1199, settings: { slidesToShow: 3 } },
    { breakpoint: 991, settings: { slidesToShow: 2 } },
    { breakpoint: 575, settings: { slidesToShow: 1 } },
  ],
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadCollections = async () => {
      try {
        const response = await fetch(COLLECTIONS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Collections request failed");
        const data = await response.json();
        // Fail closed on malformed responses; never render invented collections.
        if (
          !Array.isArray(data) ||
          !data.every(
            (collection) =>
              collection &&
              collection.id != null &&
              typeof collection.title === "string" &&
              typeof collection.nftImage === "string" &&
              typeof collection.authorImage === "string" &&
              collection.code != null
          )
        ) {
          throw new Error("Invalid collections response");
        }
        if (!controller.signal.aborted) setCollections(data);
      } catch (error) {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadCollections();
    return () => controller.abort();
  }, []);

  return (
    <section
      id="section-collections"
      className="no-bottom"
      aria-labelledby="hot-collections-heading"
      aria-busy={loading}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 id="hot-collections-heading">Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div className="col-12">
            {loading ? (
              <>
                <p className="hot-collections-sr-only" role="status">
                  Loading hot collections…
                </p>
                <div className="hot-collections-skeletons" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div className="hot-collection-slide" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="60px" height="60px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="65%" height="20px" />
                          <br />
                          <Skeleton width="30%" height="18px" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : error ? (
              <p role="alert" className="text-center">
                Unable to load hot collections. Please refresh to try again.
              </p>
            ) : collections.length === 0 ? (
              <p role="status" className="text-center">No hot collections available.</p>
            ) : (
              <div role="list" aria-label="Hot collections" className="hot-collections-carousel">
                <Slider {...sliderSettings}>
                  {collections.map((collection) => (
                    <div className="hot-collection-slide" role="listitem" key={collection.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details" aria-label={`View ${collection.title}`}>
                            <img src={collection.nftImage} className="img-fluid" alt={collection.title} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author" aria-label={`View ${collection.title} author`}>
                            <img className="pp-coll" src={collection.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore"><h4>{collection.title}</h4></Link>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
