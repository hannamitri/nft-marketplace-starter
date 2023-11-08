import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "../../css/styles/keen-slider.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        const data = res;

        setCollections(
          data.data.map((e) => ({
            id: e.id,
            title: e.title,
            authorImage: e.authorImage,
            nftImage: e.nftImage,
            authorId: e.authorId,
            code: e.code,
          }))
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    // Call the async function
    fetchData();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4, //adjust as needed
      spacing: 8, //space between slides (in px)
    },
    loop: true, //enables continuous loop
    mode: "free-snap",
    created() {
      setLoaded(true)
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } `}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    )
  }

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
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection, index) => (
                <div
                  className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
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
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                instanceRef.current?.prev()
              }/>
            <Arrow
              onClick={(e) =>
                instanceRef.current?.next()
              }/>
          </>
        )}
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
