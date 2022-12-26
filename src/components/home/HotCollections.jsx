import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      url: "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections ",
      method: "GET",
      dataResponse: "json",
    }).then((response) => {
      setData(response.data);
      setLoading(true);
    });
  }, []);

  const media = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
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
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <ReactOwlCarousel
              responsive={media.responsive}
              nav={true}
              margin={10}
              loop
            >
              {data.map((obj, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${obj.nftId}`}>
                      <img
                        src={obj.nftImage}
                        className="lazy img-fluid"
                        alt="nftImg"
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${obj.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={obj.authorImage}
                        alt="authorImg"
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{obj.title}</h4>
                    </Link>
                    <span>ERC--{obj.code}</span>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          ) : (
            <>
              <ReactOwlCarousel
                responsive={media.responsive}
                margin={10}
                loop
                nav={true}
              >
                {new Array(1).fill(0).map((obj, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Skeleton width={277} height={170} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton borderRadius={50} width={60} height={60} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width={90} height={20} />
                      <br />
                      <Skeleton width={55} height={18} />
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
