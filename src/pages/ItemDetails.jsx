import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import { useParams } from 'react-router-dom'

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { nftId } = useParams();

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItemDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItemDetails();
  }, []);


  if (loading) {
    return <Skeleton />;
  }

  if (!itemDetails) {
    return <p>No item details found.</p>;
  }

  const {
    title,
    views,
    likes,
    price,
    ownerImage,
    ownerName,
    ownerId,
    creatorName,
    creatorImage,
    nftImage,
  } = itemDetails;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* Left column: NFT image */}
              <div className="col-md-6 text-center">
                <img
                  src={nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>

              {/* Right column: Details */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {likes}
                    </div>
                  </div>

                  <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>

                  {/* Owner */}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${ownerId}`}>
                            <img
                              className="lazy"
                              src={ownerImage}
                              alt={ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${ownerId}`}>{ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${creatorName}`}>
                            <img
                              className="lazy"
                              src={creatorImage}
                              alt={creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creatorName}`}>
                            {creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    {/* Price */}
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{price}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* End right column */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
