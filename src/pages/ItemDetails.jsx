import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

  const { nftId } = useParams()
  const [item, setItem] = useState([])
  const [loading, setLoading] = useState(true)

  async function getItems() {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
    setItem(data)
    setLoading(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getItems()
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          {!loading 
          ? (
            <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title} #{item.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{item.ownerName}</Link>
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
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
          : (
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width={"636px"} height={"636px"}/>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width={"300px"} height={"46px"} borderRadius={"20px"}/>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <Skeleton width={"60px"} height={"20px"} borderRadius={"8px"}/>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                            <Skeleton width={"50px"} height={"50px"} borderRadius={"25px"}/>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">
                            <Skeleton width={"90px"} height={"20px"} borderRadius={"8px"}/>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <Skeleton width={"60px"} height={"20px"} borderRadius={"8px"}/>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.creatorId}`}>
                            <Skeleton width={"50px"} height={"50px"} borderRadius={"25px"}/>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">
                              <Skeleton width={"90px"} height={"20px"} borderRadius={"8px"}/>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <Skeleton width={"60px"} height={"20px"} borderRadius={"8px"}/>
                      <div className="nft-item-price">
                      <Skeleton width={"120px"} height={"30px"} borderRadius={"8px"}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
