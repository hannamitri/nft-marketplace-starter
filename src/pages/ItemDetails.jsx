import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonItemDetails from "../components/home/home-components/Skeletons/SkeletonItemDetails";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const ItemDetails = () => {
  const {nftId} = useParams() 
  const [nftDetails, setNftDetails] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  async function getNftDetails(){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
    setNftDetails(data)
    setIsLoaded(true)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getNftDetails()
  }, [isLoaded]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          
          {
            isLoaded ? (
              <div className="container" >
                <div className="row">
                  <div className="col-md-6 text-center" data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500">
                    <img
                      src={nftDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "0">{nftDetails.title}</h2>

                      <div className="item_info_counts" data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "150">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftDetails.likes}
                        </div>
                      </div>
                      <p data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "300">
                        {nftDetails.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40" data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "450">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={nftDetails.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{nftDetails.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content" data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "600">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={nftDetails.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">{nftDetails.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6 data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "750">Price</h6>
                        <div className="nft-item-price" data-aos ="fade-up" data-aos-once="true" data-aos-duration = "1500" data-aos-delay = "900">
                          <img src={EthImage} alt="" />
                          <span>{nftDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>      
            ) : (
              <SkeletonItemDetails />
            )

          }
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
