import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { Link, useLocation, useParams } from "react-router-dom";

const ItemDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  getItemDetails();
}, [id]);

const item = location.state?.item;
  

  const itemDetails = {
  1: {
    views: 120,
    likes: 45,
    price: 1.25,
    description: "A colorful abstract NFT with a modern artistic style.",
    authorName: "Alex Morgan",
  },
  2: {
    views: 98,
    likes: 61,
    price: 1.5,
    description: "A playful pattern NFT with a clean minimalist design.",
    authorName: "Jordan Lee",
  },
  3: {
    views: 150,
    likes: 82,
    price: 1.85,
    description: "A vibrant artistic NFT full of color and movement.",
    authorName: "Taylor Smith",
  },
  4: {
    views: 210,
    likes: 110,
    price: 2.1,
    description: "A creative digital artwork with a unique visual style.",
    authorName: "Monica Lucas",
  },
  5: {
    views: 175,
    likes: 93,
    price: 2.35,
    description: "A distinctive NFT created with bold colors and shapes.",
    authorName: "Chris Wilson",
  },
  6: {
    views: 245,
    likes: 128,
    price: 2.75,
    description: "A premium digital collectible with an original design.",
    authorName: "Jamie Davis",
  },
};

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
  console. log("OWNER IMAGE:", selectedDetails.ownerImage);


  

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
