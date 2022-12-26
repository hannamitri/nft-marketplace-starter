import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { useState } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData()
  }, []);

  const { id } = useParams()

  const [nftData, setNftData] = useState([])

  async function fetchData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
    setNftData(data)
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {
          nftData
            ?
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
                      <h2>{`${nftData.title} #${nftData.tag}`}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftData.likes}
                        </div>
                      </div>
                      <p>
                        {nftData.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.ownerId}`}>
                                <img className="lazy" src={nftData.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
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
                              <Link to={`/author/${nftData.creatorId}`}>
                                <img className="lazy" src={nftData.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.creatorId}`}>{nftData.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftData.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            :
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <Skeleton height={"100%"} width={"100%"} borderRadius={"8px"}/>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton height={"40px"} width={"350px"} borderRadius={"4px"}/>

                      <div className="item_info_counts">
                        <Skeleton height={"30px"} width={"80px"}/>
                        <Skeleton height={"30px"} width={"80px"}/>
                      </div>
                      <p>
                      <Skeleton height={"200px"} width={"400px"} borderRadius={"8px"}/>
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <Skeleton height={"15px"} width={"80px"} borderRadius={"4px"}/>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"}/>
                                <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton height={"20px"} width={"150px"} borderRadius={"4px"}/>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                        <Skeleton height={"15px"} width={"80px"} borderRadius={"4px"}/>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"}/>
                                <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton height={"20px"} width={"150px"} borderRadius={"4px"}/>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <Skeleton height={"15px"} width={"80px"}/>
                        <div className="nft-item-price">
                          <Skeleton height={"40px"} width={"80px"} borderRadius={"4px"}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        }
      </div>
    </div>
  );
};

export default ItemDetails;
