import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchApi();
  }, []);

  const { id } = useParams();

  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchApi() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setApi(data);

    setLoading(false)
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
         {  loading ?
           <div className="row">
              <div className="col-md-6 text-center items_skely">
              </div>
              <div className="col-md-6">
                <div className="item_info">
                <div className="items_skely-title"></div>

                  <div className="item_info_counts">
                    <div className=" item_skely-icons">
                     .
                    </div>
                    <div className="item_info_like">
                  .
                    </div>
                  </div>
                  <div className="items_skely-desc"></div>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                
                      <div className="item_author">
                        <div className="author_list_pp">
                         <div className="item-skelly-icon"> </div>
                        </div>
                        <div className="author_list_info">
                         <div className="items_author-titles">  </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                
                      <div className="item_author">
                        <div className="author_list_pp">
                           <div className="item-skelly-icon"> </div>
                        </div>
                        <div className="author_list_info">
                         <div className="items_author-titles">  </div>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                   <div className="items_skely-title"></div>
                    <div className="nft-item-price">
                     <div className="items_skely-title"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         :
         
         <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={api.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{api.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {api.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {api.likes}
                    </div>
                  </div>
                  <p>{api.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${api.ownerId}`}>
                            <img className="lazy" src={api.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${api.ownerId}`}>
                            {api.ownerName}
                          </Link>
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
                          <Link to={`/author/${api.creatorId}`}>
                            <img
                              className="lazy"
                              src={api.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${api.creatorId}`}>
                            {api.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{api.price}</span>
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
