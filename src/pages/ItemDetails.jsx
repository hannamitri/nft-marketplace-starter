import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NewDetailsSkeleton from "../components/UI/NewDetailsSkeleton";


const ItemDetails = () => {
  const{ id } = useParams()
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function fetchItemDetails() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);

    setItemDetails(data);
    setLoading(false)
  }

  fetchItemDetails();
}, [id]);

 if (!itemDetails) {
  return <NewDetailsSkeleton />;
}
  const item = itemDetails;

    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" 
          className="mt90 sm-mt-0">
            <div className="container">
              <div className="row"
              data-aos="zoom-in">
                  {loading ? (
                    <NewDetailsSkeleton />
                  ) : (
                    <>
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                 
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{item.title}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.likes}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.views}
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
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>
                            {item.ownerName}</Link>
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
                              <img
                                className="lazy"
                                src={itemDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>
                            {itemDetails.creatorName}</Link>
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
                </>
                 )}
              </div>
            </div>
          </section>
        </div>
      </div>
   ) ;
};

export default ItemDetails;
