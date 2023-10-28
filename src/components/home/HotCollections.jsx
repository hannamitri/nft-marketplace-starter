import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "../../css/styles/keen-slider.css"

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)
      }
    };
    // Call the async function
    fetchData();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: {
        perView: 4, //adjust as needed
        spacing: 15, //space between slides (in px)
      },
      loop: true, //enables continuous loop
      mode: "free-snap",
    }
  );

  if (isLoading) {
    return <p>Loading...</p>
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
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection, index) => (
              <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
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
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
