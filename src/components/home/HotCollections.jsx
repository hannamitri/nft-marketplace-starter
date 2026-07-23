import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
  loop: true,

  slides: {
    perView: 4,
    spacing: 20,
  },

  breakpoints: {
    "(max-width: 992px)": {
      slides: {
        perView: 2,
        spacing: 16,
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
  React.useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
         
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 React.useEffect(() => {
  instanceRef.current?.update();
}, [collections, instanceRef]);

  return (
     <section
  id="section-collections"
  className="no-bottom"
  data-aos="fade-up"
>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
           {loading ? (
  <div className="keen-slider">
    {new Array(4).fill(0).map((_, index) => (
      <div className="keen-slider__slide" key={index}>
        <div className="nft_coll">
          <Skeleton
            width="100%"
            height="250px"
            borderRadius="8px"
          />

          <div style={{ marginTop: "16px" }}>
            <Skeleton
              width="70%"
              height="24px"
              borderRadius="4px"
            />

            <div style={{ marginTop: "8px" }}>
              <Skeleton
                width="40%"
                height="16px"
                borderRadius="4px"
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div ref={sliderRef} className="keen-slider">
    {collections.map((collection) => (
      <div
       className="keen-slider__slide"
        key={collection.id}
      >
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to={`/item-details/${collection.nftId}`}>
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
                alt=""
              />
            </Link>
            <i className="fa fa-check"></i>
          </div>

          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{collection.title}</h4>
            </Link>
            <span>{collection.tokenType}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
