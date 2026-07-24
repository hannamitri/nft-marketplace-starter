import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import './ItemDetails.css'

const ItemDetails = (props) => {

  const { id } = useParams();
  const [details, setDetails] = useState({});

  console.log("id is ", id);

  

  /*props.allItems.length > 0?
    props.allItems
    .filter((collection) => {
      console.log(collection.nftId);
      console.log(id);
      return collection.nftId == id
        
      }
    )
    .map((collection) => {
      if(counter == 0){
        counter++;
        
        }
    })*/

  
  useEffect(() => {
  
    getItemDetails();
    
    async function getItemDetails(){
    let detailsRequest = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
    let detailsRequestJSON = await detailsRequest.json();
    setDetails(detailsRequestJSON);
    }

  }, [id]);

  return (
    <div id="wrapper" data-aos="fade" data-aos-delay="100" data-aos-duration="1000">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {Object.keys(details).length > 0?
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{details.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          100
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          74
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
                              <Link to={`/author/${details.ownerId}`}>
                                <img className="lazy" src={details.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.ownerId}`}>{details.ownerName}</Link>
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
                              <Link to={`/author/${details.creatorId}`}>
                                <img className="lazy" src={details.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.creatorId}`}>{details.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>1.85</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
                :
                <div className="row">
                  <div className="col-md-6 text-center details__skeleton--image skeleton-box">
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div className="details__skeleton--title skeleton-box"></div>
                      <div className="item_info_counts">
                        <div className="item_info_views details__skeleton--counts skeleton-box">
                          
                        </div>
                        <div className="item_info_like details__skeleton--counts skeleton-box">
                          
                        </div>
                      </div>
                      <p className="details__skeleton--desc skeleton-box">
                        
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author" className="details__skeleton--headshot skeleton-box">
                                

                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author" className="details__skeleton--author skeleton-box"></Link>
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
                              <Link to="/author" className="details__skeleton--headshot skeleton-box">
                                

                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author" className="details__skeleton--author skeleton-box"></Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price details__skeleton--author skeleton-box">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }      
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
