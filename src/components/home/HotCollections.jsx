import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hot collections");
        }

        const data = await response.json();

        setCollections(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex + itemsPerPage >= collections.length
        ? 0
        : previousIndex + itemsPerPage
    );
  };

  const previousSlide = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex - itemsPerPage < 0
        ? Math.floor(
            (collections.length - 1) / itemsPerPage
          ) * itemsPerPage
        : previousIndex - itemsPerPage
    );
  };

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
            <p>Loading collections...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="650"
            >
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="home-carousel">
          {collections.length > itemsPerPage && (
            <button
              type="button"
              className="home-carousel-arrow home-carousel-arrow-left"
              onClick={previousSlide}
              aria-label="Show previous hot collections"
            >
              ‹
            </button>
          )}

          <div className="row">
            {collections
              .slice(
                currentIndex,
                currentIndex + itemsPerPage
              )
              .map((collection, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={collection.id}
                  data-aos="fade-up"
                  data-aos-duration="650"
                  data-aos-delay={(index % 4) * 100}
                  data-aos-offset="100"
                  data-aos-once="true"
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link
                        to={`/item-details/${collection.nftId}`}
                      >
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link
                        to={`/author/${collection.authorId}`}
                      >
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={`${collection.title} author`}
                        />
                      </Link>

                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>

                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {collections.length > itemsPerPage && (
            <button
              type="button"
              className="home-carousel-arrow home-carousel-arrow-right"
              onClick={nextSlide}
              aria-label="Show next hot collections"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
