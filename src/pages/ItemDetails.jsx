import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
const ItemDetails = () => {
  const location = useLocation();
  const nftId = location.state; // Getting the passed ID from Link
   console.log(nftId)
  const [nftData,setNftData] = useState(); // Will hold the matching NFT item
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        console.log(data)
        const matchedItem = data.find((item) =>item.nftId===nftId);
        console.log(matchedItem)
        setNftData(matchedItem);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching NFT item:", error);
      }
    };
    fetchData();
  }, [nftId]);
    console.log(nftData)
  // While loading or not found
  if (!nftData) return <div>Loading item details...</div>;
   console.log(nftData)
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftData.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> 100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {nftData.likes}
                    </div>
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eius quam error omnis quibusdam excepturi provident at libero nulla incidunt facere, rem ullam ipsam praesentium ducimus nisi ad perspiciatis id.

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={nftData.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{nftData.owner}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{nftData.title || "Unknown"}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftData.price} ETH</span>
                    </div>
                  </div>
                </div>
              </div> {/* end .col-md-6 */}
            </div> {/* end .row */}
          </div> {/* end .container */}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;