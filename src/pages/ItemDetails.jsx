import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams()
  const [nftItems, setNftItems] = useState("")
  const [loading, setLoading] = useState(true);

  async function fetchNftItems() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
    setNftItems(data)
    setLoading(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNftItems();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
            {loading ? (
              <>
              <div className="col-md-6 text-center">
                <div className="nft-image__skeleton shimmer"></div>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2 className="nft_title__skeleton shimmer"></h2>

                  <div className="item_info_counts">
                    <div className="item_info_views__skeleton shimmer"></div>
                    <div className="item_info_like__skeleton shimmer"></div>
                  </div>
                  <p className="nft_description__skeleton shimmer"></p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">     
                            <div className="lazyload__img shimmer"></div>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <div className="title__skeleton shimmer"></div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <div className="lazyload__img shimmer"></div>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <div className="title__skeleton shimmer"></div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span className="price__skeleton shimmer"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              </>

            ) : (
              <>
              <div className="col-md-6 text-center">
                <img
                  src={nftItems.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nftItems.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftItems.title + " #" + nftItems.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftItems.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftItems.likes}
                    </div>
                  </div>
                  <p>
                    {nftItems.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftItems.ownerId}`}>
                            <img className="lazy" src={nftItems.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftItems.ownerId}`}>{nftItems.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftItems.creatorId}`}>
                            <img className="lazy" src={nftItems.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftItems.creatorId}`}>{nftItems.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftItems.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              </>
            )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
