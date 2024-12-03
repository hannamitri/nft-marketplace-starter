import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  //hot collections list state
  const [hotCollectionsList, setHotCollectionsList] = useState();

  const [loading, setLoading] = useState(true);

  //fetching hot collections data using axios
  async function getHotCollectionsData() {
    return await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
  }

  //owl carousel
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      650: {
        items: 2,
      },
      768: { items: 3 },
      1024: { items: 4 },
    },
  };

  useEffect(() => {
    const apiResp = getHotCollectionsData();
    apiResp
      .then((resp) => {
        setHotCollectionsList(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (hotCollectionsList) {
      setLoading(false);
    }
  }, [hotCollectionsList]);

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
          {!loading && hotCollectionsList ? (
            <>
              {" "}
              <OwlCarousel classID="owl-them" {...options}>
                {hotCollectionsList.map((element) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 hotCollectionContainer"
                    key={element.id}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={element.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={element.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{element.title}</h4>
                        </Link>
                        <span>ERC-{element.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>{" "}
            </>
          ) : (
            <>
              <OwlCarousel classID="owl-theme" {...options}>
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 hotCollectionContainer"
                  key={1}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton
                        width="60px"
                        height="60px"
                        borderRadius="999px"
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="75%" height="24px" />
                      <Skeleton width="40%" height="24px" />
                    </div>
                  </div>
                </div>
              </OwlCarousel>{" "}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
