import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";

import { Link, useLocation, useParams } from "react-router-dom";

const ItemDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  

  useEffect(() => {
  const getItemDetails = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );

      console.log("DETAIL API:", response.data);
      setDetails(response.data);
    } catch (error) {
      console.error("Error loading item details:", error);
    } finally {
      
    }
  };

  getItemDetails();
}, [id]);

const item = location.state?.item;
  


const selectedDetails =
  details || location.state?.item;

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

if (!selectedDetails) {
  return <h2>Item not found</h2>;
}


console.log("ITEM DETAILS:", item);
  console.log("ITEM ID:", id);
  console.log("CLICKED ITEM:", item);
  console.log("CREATOR IMAGE:", selectedDetails.creatorImage);
  console.log("OWNER IMAGE:", selectedDetails.ownerImage);


  

  return (
  <div id="wrapper">46
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>

      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          <div className="row align-items-start">

            <div className="col-md-6 text-center">
             <img
  src={selectedDetails.nftImage}
  className="img-fluid img-rounded mb-sm-30 nft-image"
  alt={selectedDetails.title}
/>
            </div>

            <div className="col-md-6">
              <div className="item_info">
                <h2>
  {selectedDetails.title} #{selectedDetails.tag}
</h2>

                <div className="item_info_counts">
                  <div className="item_info_views">
                    <i className="fa fa-eye"></i>
                    {selectedDetails.views}
                  </div>

                  <div className="item_info_like">
                    <i className="fa fa-heart"></i>
                    {selectedDetails.likes}
                  </div>
                </div>

                <p>{selectedDetails.description}</p>

               

                <div className="spacer-40"></div>

                <h6>Owner</h6>

<div className="item_author">
  <div className="author_list_pp">
    <Link to={`/author/${selectedDetails.ownerId}`}>
      <img
        className="lazy"
        src={selectedDetails.ownerImage}
        alt={selectedDetails.ownerName}
      />
      <i className="fa fa-check"></i>
    </Link>
  </div>

  <div className="author_list_info">
    <Link to={`/author/${selectedDetails.ownerId}`}>
      {selectedDetails.ownerName}
    </Link>
  </div>
</div>

                 <h6>Creator</h6>

<div className="item_author">
  <div className="author_list_pp">
    <Link to={`/author/${selectedDetails.creatorId}`}>
      <img
        className="lazy"
        src={selectedDetails.creatorImage}
        alt={selectedDetails.creatorName}
      />
      <i className="fa fa-check"></i>
    </Link>
  </div>

  <div className="author_list_info">
    <Link to={`/author/${selectedDetails.creatorId}`}>
      {selectedDetails.creatorName}
    </Link>
  </div>
</div>

                <h6>Price</h6>

                <div className="nft-item-price">
                  <img src={EthImage} alt="" />
                  <span>{selectedDetails.price} ETH</span>
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
