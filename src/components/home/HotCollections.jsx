import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
    },
  });

  let holdInterval = null;

const startHold = (direction) => {
  if (slider.current) {
    holdInterval = setInterval(() => {
      direction === "prev"
        ? slider.current.prev()
        : slider.current.next();
    }, 200);
  }
};

const stopHold = () => {
  clearInterval(holdInterval);
};


  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await res.json();
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-end mb-3 gap-2">
            <button
             className="btn btn-outline-primary"
             onMouseDown={() => startHold("prev")}
             onMouseUp={stopHold}
             onMouseLeave={stopHold}
>
             &#8592; Prev
            </button>

            <button
             className="btn btn-outline-primary"
             onMouseDown={() => startHold("next")}
             onMouseUp={stopHold}
             onMouseLeave={stopHold}
>
             Next &#8594;
           </button>

            </div>

            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="keen-slider__slide"
                  style={{ padding: "0 10px" }}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`} state={{ collection }}>
                     <img
                       src={collection.nftImage}
                       className="lazy img-fluid"
                       alt={collection.title}
                     />
                   </Link>

                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt="Author"
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
          </>
        )}
      </div>
    </section>
  );
};

export default HotCollections;















