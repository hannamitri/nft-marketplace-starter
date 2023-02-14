import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Skeleton as Skelly } from "@mui/material";
import { Box } from "@mui/system";

const HotCollections = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState([]);

  async function fetchHotCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCards(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

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
          <Slider {...settings}>
            {cards.map((card, id) => (
              <div
                className="col-lg-12 col-md-6 col-sm-6 col-xs-12 mw-100"
                key={id}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      {loading ? (
                        <Skelly
                          animation="wave"
                          sx={{ height: 190 }}
                          variant="rectangular"
                        />
                      ) : (
                        <img
                          src={card.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      )}
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      {loading ? (
                        <Skelly
                          animation="wave"
                          variant="circular"
                          width={60}
                          height={60}
                        />
                      ) : (
                        <img
                          className="lazy pp-coll"
                          src={card.authorImage}
                          alt=""
                        />
                      )}
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      {loading ? (
                        <Box sx={{ pl: 12 }}>
                          <Skelly
                            animation="wave"
                            height={10}
                            width="60%"
                            style={{ marginBottom: 6 }}
                          />
                          <Skelly animation="wave" height={10} width="60%" />
                        </Box>
                      ) : (
                        <>
                          <h4>{card.title}</h4>
                          <span>{card.code}</span>
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
