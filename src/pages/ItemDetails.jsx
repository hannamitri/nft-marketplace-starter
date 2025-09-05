import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNFT = async () => {
      try {
        const res = await axios.get(
  `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
);
setNft(res.data);
      } catch (err) {
        console.error("Error fetching NFT:", err);
      }
    };
    fetchNFT();
  }, [id]);

  if (!nft) return <div className="text-center">Loading...</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> 100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {nft.likes}
                    </div>
                  </div>

                  <p>{nft.description || "No description available."}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <img
                            className="lazy"
                            src={nft.authorImage}
                            alt={nft.author}
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          {nft.author}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="spacer-40"></div>
                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <img src={EthImage} alt="eth" />
                    <span>{nft.price.toFixed(2)} ETH</span>
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
