import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

// fetch data from backend API from cloud server using axios to render dynamic cards --> part 1
// to get data displayed in a nice carousel, choose from 3 libraries (react-owl-carousel, keen-slider, react-slick), lightweight? / very little code? / easiest to implement? --> part 2
// skeleton loading state --> part 3

// pr
// install axios, hit a backend API, made the data dynamic, implement a fully responsive carousel, added skeleton loading state

const HotCollections = () => {
  // https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections
  const [hotCollections, setHotCollections] = useState([]); // array of 6 objects

    // object
    const options = {
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        1200: { items: 4 },
      },
    };

  async function getHotCollectionsData() {
    console.log(
      await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      )
    ); // object of objects { data: Array(6), ... }
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
  }

  useEffect(() => {
    getHotCollectionsData();
  }, []);

  console.log(hotCollections); // Array of 6 objects

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

                        {/* loop: false, infinity loop
              margin: m-r(px) on item
              nav: true, show next/prev buttons 
              responsive: object containing responsive options
              items: number, number of items u want see on screen */}
          {hotCollections.length ? (
              <OwlCarousel {...options}>
                {/* hot collections array of objects */}
                {/* <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={collection.id}
            > */}
                {/* collection object */}
                {hotCollections?.map((collection) => (
                  <div className="nft_coll" key={collection.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
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

                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
          ) : (
            <>
              <OwlCarousel {...options}>
                {/* skeleton */}
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={``}>
                        {/* nft image */}
                        <Skeleton width="100%" height="200px" />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={``}>
                        {/* author image */}
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>

                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="">
                        {/* collection title */}
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br />
                      {/* collection code */}
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
