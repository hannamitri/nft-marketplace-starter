import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import SkeletonDetails from "../components/SkeletonDetails";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchItem() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
        console.log("useParams id:", id);
        console.log("Fetched NFT details (raw API response):", data);

        if (!data) {
        console.warn("⚠️ API returned null for this ID. No item found.");
      }
        setItem(data);
      
      } catch (err) {
        console.error("Error fetching NFT item:", err);
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
    if (id) {
  window.scrollTo(0, 0);
    fetchItem();
    }
  }, [id]);
  
   

  if (isLoading) {
    return (
      <SkeletonDetails />
    );
  }

  if (!item) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Item not found.</p>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts d-flex gap-4 mb-3">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                       {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
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
                          <Link to={`/author/${item.authorId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
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
                          <Link to={`/author/${item.authorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}> 
                          {item.creatorName}</Link>
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
