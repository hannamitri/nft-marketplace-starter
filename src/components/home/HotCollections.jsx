import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "@mui/material";

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState();

  async function fetchItems() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setItems(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchItems();
  }, []);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

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

          {!Loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={24}
              responsive={state.responsive}
            >
              {new Array(4).fill(0).map((_, index) => (
                <>
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          variant="rounded"
                          width="100%"
                          height="100%"
                          animation="wave"
                        ></Skeleton>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="lazy pp-coll">
                          <center>
                            {" "}
                            <Skeleton
                              variant="circular"
                              width={50}
                              height={50}
                              animation="wave"
                            ></Skeleton>
                          </center>
                        </div>

                        <i className="fa fa-check">
                          <Skeleton
                            variant="circular"
                            width="100%"
                            height="100%"
                            animation="wave"
                          ></Skeleton>
                        </i>
                      </div>
                      <div className="nft_coll_info">
                        <h4>
                          <center>
                            <Skeleton
                              varient="text"
                              sx={{ fontsize: "5rem" }}
                              width={120}
                              animation="wave"
                            ></Skeleton>
                          </center>
                        </h4>
                        <span>
                          <center>
                            {" "}
                            <Skeleton
                              varient="text"
                              sx={{ fontsize: "1rem" }}
                              width={80}
                              animation="wave"
                            ></Skeleton>
                          </center>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={24}
              responsive={state.responsive}
            >
              {items.map((item) => (
                // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="item" src={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
                /* </div> */
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
