import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });

    const fetchNft = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await res.json();
        setNft(data);
      } catch (err) {
        console.error("Error fetching NFT:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNft();
  }, [nftId]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="skeleton-box mb-4" style={{ height: "300px", borderRadius: "12px" }} />
          </div>
          <div className="col-md-6">
            <div className="skeleton-line mb-3" style={{ width: "60%", height: "25px" }} />
            <div className="skeleton-line mb-2" style={{ width: "40%", height: "15px" }} />
            <div className="skeleton-line mb-2" style={{ width: "80%", height: "15px" }} />
            <div className="skeleton-line mb-2" style={{ width: "70%", height: "15px" }} />
            <div className="skeleton-line mb-2" style={{ width: "50%", height: "15px" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">NFT not found.</p>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>
              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {nft.likes}
                    </div>
                  </div>

                  <p>{nft.description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.ownerId}`}>
                            <img className="lazy" src={nft.ownerImage} alt={nft.ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.creatorId}`}>
                            <img className="lazy" src={nft.creatorImage} alt={nft.creatorName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{nft.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;