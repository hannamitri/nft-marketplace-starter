import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ItemDetails = (props) => {

  const { nftId } = useParams();
  const [fin, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    }
    getData();
  }, []);


  return (

    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading ? (
          <>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                  <div className="skeleton-box" style={{width: "100%", height: "100%"}}></div>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <div className="skeleton-box" style={{width: "300px",height: "40px"}}></div>
                      <div className="item_info_counts">
                        <div className="skeleton-box" style={{width: "80px",height: "30px",}}></div>
                        <div className="skeleton-box" style={{width: "80px",height: "30px",}}></div>
                  </div>
                  <p className="skeleton-box" style={{width : "100%", height: "100%", visibility: "none", color: "#dddbdd"}}>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.ß
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author" style={{display:"flex", justifyContent:"space-between",  marginLeft: "10px" }}>
                        <div className="skeleton-box author_list_pp" style={{
                          height: "50px",
                          borderRadius: "100%",
                          marginRight: "10px",
                          zIndex: "1",
                          display:"block"
                          }}>
                          <Link to="/author"></Link>
                        </div>
                        <div className="author_list_info" style={{ position:"absolute" }}>
                          <Link to="/author" className="skeleton-box" style={{color:"#dddbdd"}}>Monica Lucas</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author" style={{display:"flex", justifyContent:"space-between",  marginLeft: "10px" }}>
                        <div className="skeleton-box author_list_pp" style={{
                          height: "50px",
                          borderRadius: "100%",
                          marginRight: "10px",
                          zIndex: "1",
                          display:"block"
                          }}>
                          <Link to="/author"></Link>
                        </div>
                        <div className="author_list_info" style={{position:"absolute"}}>
                          <Link to="/author" className="skeleton-box" style={{color:"#dddbdd"}}>Monica Lucas</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span className="skeleton-box" style={{color:"#dddbdd"}}>1.85</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
          </>
        ) : (
          <>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={fin.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{fin.title} #194</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {fin.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {fin.likes}
                    </div>
                  </div>
                  <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img className="lazy" src={fin.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{fin.ownerName}</Link>
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
                            <img className="lazy" src={fin.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{fin.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{fin.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
        )}
      </div>
    </div>
  );
};



export default ItemDetails;

   