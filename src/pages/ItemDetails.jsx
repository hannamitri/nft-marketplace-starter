import React, { useEffect, useState, } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams  } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
const ItemDetails = () => {
  const { nftId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
    setItems(data);
    setLoading(false);
    window.scrollTo(0, 0);
  } fetchData();}, [nftId]);

  if (loading) {
    return(
<div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
              <Skeleton width="100%" height="500px" borderRadius="10px" />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2> <Skeleton width="80%" height="50px" borderRadius="5px" /></h2>

                  <div className="item_info_counts">
                  <Skeleton width="10%" height="40px" borderRadius="5px" /><Skeleton width="10%" height="40px" borderRadius="5px" />
                  </div>
                  <p>
                  <Skeleton width="100%" height="90px" borderRadius="5px" />
                  </p>
                  <Skeleton width="20%" height="20px" borderRadius="5px" />
                  <div className="d-flex flex-row">        
                  <Skeleton width="40%" height="35px" borderRadius="5px" />
                    <div className="item_author">
                     
                      </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content"> 
                    <Skeleton width="20%" height="20px" borderRadius="5px" />   
                      <div className="item_author">
                      <Skeleton width="40%" height="60px" borderRadius="5px" />
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <Skeleton width="10%" height="20px" borderRadius="5px" />   
                    <div className="nft-item-price">
                    <Skeleton width="20%" height="35px" borderRadius="5px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    )
  }

  return (
    <div id="wrapper" >
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container" >
            <div className="row" >
              <div className="col-md-6 text-center">
                <img
                  src={items.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                   data-aos="fade-right" data-aos-duration="2000"
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <div data-aos="fade-left" data-aos-duration="2000">
                  <h2  >{items.title} #{items.tag}                    
                  </h2>
                  </div>

                  <div className="item_info_counts">
                    <div className="item_info_views" data-aos="fade-left" data-aos-duration="2000">
                      <i className="fa fa-eye"></i>
                      {items.views}
                    </div>
                    <div className="item_info_like" data-aos="fade-left" data-aos-duration="2000" >
                      <i className="fa fa-heart"></i>
                      {items.likes}
                    </div>
                  </div>
                  <div data-aos="fade-left" data-aos-duration="2000">
                  <p>
                    {items.description}
                  </p>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="mr40"  data-aos="fade-left" data-aos-duration="2000">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${items.ownerId}`}>
                            <img className="lazy" src={items.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${items.ownerId}`}>{items.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div data-aos="fade-left" data-aos-duration="1000">
                  <div className="de_tab tab_simple" >
                
                    <div className="de_tab_content"  data-aos="fade-left" data-aos-duration="2000">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${items.creatorId}`}>
                            <img className="lazy" src={items.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${items.creatorId}`}>{items.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <div  data-aos="fade-left" data-aos-duration="1000">
                    <h6>Price</h6>
                    </div>
                    <div className="nft-item-price"  data-aos="fade-left" data-aos-duration="1000">
                      <img src={EthImage} alt="" />
                      <span>{items.price}</span>
                    </div>
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
