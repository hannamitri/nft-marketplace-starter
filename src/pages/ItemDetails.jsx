import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";


const ItemDetails = () => {
  const [itemData, setItemData] = useState(null);
  let params = useParams();

  console.log(params);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const nftId = params.id
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = response.data;
        setItemData(data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemData && itemData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData?itemData.title:"Loading..."}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {itemData?itemData.views:"Loading..."}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {itemData?itemData.likes:"Loading..."}
                    </div>
                  </div>
                  <p>
                    {itemData?itemData.description:"Loading..."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <div>
                          <Link to={`/author/${itemData && itemData.ownerId}`}>
                            <img className="lazy" src={itemData && itemData.ownerImage} alt="" />
                            <i className="fa fa-check"></i> 
                          </Link>
                          </div>
                          <div className="author_list_pp_name" >
                            {itemData && itemData.ownerName}
                          </div>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{itemData?itemData.owner:"Loading..."}</Link>

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
                          <Link to={`/author/${itemData && itemData.creatorId}`}>
                            <img className="lazy" src={itemData && itemData.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                          <div className="author_list_pp_name">
                            {itemData && itemData.creatorName}
                          </div>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData && itemData.creatorId}`}>
                            {itemData?itemData.creator:"loading..."}
                            </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <div className="author_list_pp">
                    <h6>Price</h6>
                    </div>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemData?itemData.price:"Loading..."}</span>
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
