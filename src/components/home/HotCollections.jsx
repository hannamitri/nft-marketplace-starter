import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { getNFTS } from "../../services/hot_collections";
import Slider from "react-slick";

const HotCollections = () => {
  const [nfts, setNFTs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 }, // For tablet view
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 }, // For mobile view
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }, // For small mobile screens
      },
    ],
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      const res = await getNFTS();
      console.log(`res`, res);
      res?.status === 200 && setNFTs(res.data);
      setLoading(false);
    };

    fetchNFTs(); // Call the async function

    window.scrollTo(0, 0);
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

          <div className="slider-container">
            <Slider {...settings}>
              {nfts.length > 0
                ? nfts.map((nft, index) => (
                    <div style={{ padding: "0 10px" }} key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            {loading ? (
                              <div className="hot-collection__img--skeleton skeleton"></div>
                            ) : (
                              <img
                                src={nft.nftImage}
                                className="lazy img-fluid"
                                alt={nft.title}
                              />
                            )}
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            {loading ? (
                              <div className="hot-collection__author-img--skeleton skeleton"></div>
                            ) : (
                              <>
                                <img
                                  className="lazy pp-coll"
                                  src={nft.authorImage}
                                  alt={nft.authorName}
                                />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                          {loading ? (
                            <div className="hot-collection__nft-title--skeleton skeleton"></div>
                          ) : (
                            
                            <h4>{nft.title}</h4>
                          )}
                          </Link>
                          {loading ? (
                            
                            <div className="hot-collection__nft-code--skeleton skeleton"></div>
                          ) : (
                            
                            <span>{nft.code}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                : new Array(4).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={nftImage}
                              className="lazy img-fluid"
                              alt="Default NFT"
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={AuthorImage}
                              alt="Default Author"
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>Pinky Ocean</h4>
                          </Link>
                          <span>ERC-192</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
