import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
    const { nftId } = useParams()
  const [data, setdata] = useState(null)
   async function fetchData(){
   await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
    .then((items)=>{
      setTimeout(() => {
        
        setdata(items.data)
      }, 200);

    })
   }
useEffect(() => {
    fetchData()
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {data ? <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={data?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{data?.title} #{data?.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {data?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {data?.likes}
                    </div>
                  </div>
                  <p>
                    {data?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${data.ownerId}`}>
                            <img className="lazy" src={data?.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${data.ownerId}`}>{data?.ownerName}</Link>
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
                          <Link to="/author">
                            <img className="lazy" src={data?.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${data.creatorId}`}>{data.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{data?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <div className="row">
              <div className="col-md-6 text-center">
               <Skeleton width={"100%"} height={"100%"}></Skeleton>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2><Skeleton width={300} height={40}></Skeleton></h2>

                  <div className="item_info_counts">
                      <Skeleton width={80} height={30}></Skeleton>
                    <Skeleton width={80} height={30}></Skeleton>
                  </div>
                  <p>
                  <Skeleton width={"100%"} height={80}></Skeleton>
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/">
                          <Skeleton width={50} height={50} borderRadius={"50%"}></Skeleton>
                          </Link>
                        </div>
                        <div className="author_list_info">
                        <Skeleton width={125} height={20}></Skeleton>
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
                          <Link to="/">
                          <Skeleton width={50} height={50} borderRadius={"50%"}></Skeleton>

                          </Link>
                        </div>
                        <div className="author_list_info">
                        <Skeleton width={125} height={20}></Skeleton>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                    <Skeleton width={75} height={20}></Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
