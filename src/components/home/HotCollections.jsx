import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const owlInitialized = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchHotCollections() {
      try {
        if (isMounted) setLoading(true);

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        await new Promise((r) => setTimeout(r, 2000));

        if (isMounted) {
          setCollections(response.data || []);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching hot collections:", error);
          setLoading(false);
        }
      }
    }

    fetchHotCollections();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const $ = window.jQuery;
    if (typeof $ !== "function") return;

    const $el = $(".hot-collections-owl");
    if (!$el.length) return;

    if (loading) {
      if ($el.hasClass("owl-loaded")) {
        $el.trigger("destroy.owl.carousel");
        $el.removeClass("owl-loaded");
        $el.find(".owl-stage-outer").children().unwrap();
      }
      owlInitialized.current = false;
      return;
    }

    if (!collections.length) return;

    if (typeof $el.owlCarousel !== "function") return;

    const t = setTimeout(() => {
      $el.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          992: { items: 3 },
          1200: { items: 4 },
        },
      });
      owlInitialized.current = true;
    }, 0);

    return () => {
      clearTimeout(t);
      if ($el.hasClass("owl-loaded")) {
        $el.trigger("destroy.owl.carousel");
      }
      owlInitialized.current = false;
    };
  }, [loading, collections]);

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
            <div
              className={`hot-collections-owl ${loading ? "" : "owl-carousel"}`}
            >
              {loading ? (
                <div className="skeleton-strip">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div className="skeleton-slide" key={`sk-${i}`}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="12px"
                          />
                        </div>

                        <div className="nft_coll_pp">
                          <Skeleton
                            width="44px"
                            height="44px"
                            borderRadius="50%"
                          />
                        </div>

                        <div className="nft_coll_info">
                          <Skeleton
                            width="80%"
                            height="16px"
                            borderRadius="8px"
                          />
                          <br />
                          <Skeleton
                            width="50%"
                            height="16px"
                            borderRadius="8px"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                collections.map((collection, idx) => (
                  <div
                    key={
                      collection.id ??
                      collection.code ??
                      collection.title ??
                      idx
                    }
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage || nftImage}
                            className="img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="pp-coll"
                            src={collection.authorImage || AuthorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
