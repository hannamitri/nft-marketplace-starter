import React, {useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

import { Skeleton } from "@mui/material";
import { getItemDetails } from "../api/itemdetails";
import Aos from "aos";
import "aos/dist/aos.css";


const ItemDetails = () => {
const [items, setItems] = useState([]);
const { id } = useParams();

const idNumber = parseInt(id, 10);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
// Any comment animations

  useEffect(() => {
    async function fetchData() {
      const items = await getItemDetails(idNumber);
      setLoading(true);
      setItems(items);
    }
    setTimeout(() => {
      setLoading(false);
    }, 350);
    fetchData();
  }, [idNumber]);
  
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  
 



return (
    <div id="wrapper"
    data-aos="fade-in"
    >
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width={350}
                    height={500}
                    />) : (
                <img
                  src={items.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton height={50}/>
                  ) : (
                    
                    <h2>{items.title}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {items.likes}
                    </div>
                  </div>
                  {loading ? (
                    <Skeleton height={150} /> 
                   
                  ) : (
                  <p>
                    {items.description}
                  </p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton variant="circular" width={50} height={50} />
                          ) : (
                          <Link to={`/author/${items.ownerId}`}>
                            <img className="lazy" src={items.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={200} height={25} />
                          ) : (
                            <Link to="/author">{items.ownerName}</Link>
                          )}
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
                          {loading ? (
                            <Skeleton variant="circular" width={50} height={50} />
                          ) : (
                          <Link to={`/author/${items.creatorId}`}>
                            <img className="lazy" src={items.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width={200} height={25} />
                          ) : (
                          <Link to=
                          {{pathname:`/author/${items.authorId}`}}
                          
                          >
                            
                            {items.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                      {loading ? (
                        <Skeleton width={200} height={25} />
                      ) : (
                        <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{items.price}</span>
                      </div>
                      )}
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
