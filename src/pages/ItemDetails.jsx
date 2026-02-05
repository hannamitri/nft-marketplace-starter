import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/skeleton/Skeleton";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ItemDetails = ({ data }) => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
     AOS.refresh();
    async function fetchItem() {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [nftId, data]);

  useEffect(() => {
    if (item) {
      setTimeout(() => setDetailsLoaded(true), 300);
    }
  }, [item]);

  if (loading) {
    return (
      <div className="container mt-5">
        <Skeleton width="100%" height="400px" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-5">
        <h3>No item data found</h3>
        <p>Try navigating from Hot Collections or Explore again.</p>
      </div>
    );
  }

  // Extract fields
  const imageSrc = item.nftImage || nftImage;
  const title = item.title || "Untitled NFT";
  const tag = item.tag ? `#${item.tag}` : "";
  const fullTitle = `${title} ${tag}`.trim();

  const description = item.description || "No description available.";
  const views = item.views ?? 0;
  const likes = item.likes ?? 0;
  const price = item.price ?? "N/A";

  // Owner
  const ownerId = item.ownerId || "Unknown Owner";
  const ownerName = item.ownerName || ownerId;
  const ownerImg = item.ownerImage || AuthorImage;

  // Creator
  const creatorId = item.creatorId || "Unknown Creator";
  const creatorName = item.creatorName || creatorId;
  const creatorImg = item.creatorImage || AuthorImage;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* LEFT — NFT IMAGE */}
              <div className="col-md-6 text-center" data-aos="zoom-in" data-aos-duration="1200">
                {!imageLoaded && <Skeleton width="100%" height="400px" />}

                <img
                  src={imageSrc}
                  alt={fullTitle}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    display: imageLoaded ? "block" : "none",
                    width: "100%",
                    borderRadius: "10px"
                  }}
                />
              </div>

              {/* RIGHT — DETAILS */}
              <div className="col-md-6" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000">
                <div className="item_info">

                  {/* TITLE + TAG */}
                  {!detailsLoaded ? (
                    <Skeleton width="60%" height="35px" />
                  ) : (
                    <h2>{fullTitle}</h2>
                  )}

                  {/* VIEWS + LIKES */}
                  {!detailsLoaded ? (
                    <Skeleton width="50%" height="20px" />
                  ) : (
                    <p className="item_views_likes">
                      <strong>Views:</strong> {views} &nbsp; | &nbsp;
                      <i className="fa fa-heart"></i> <strong>Likes:</strong> {likes} 
                    </p>
                  )}

                  {/* DESCRIPTION */}
                  {!detailsLoaded ? (
                    <Skeleton width="100%" height="80px" />
                  ) : (
                    <p>{description}</p>
                  )}

                  
                  {/* OWNER */}
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      {!detailsLoaded ? (
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      ) : (
                        <img src={ownerImg} alt={ownerName} />
                      )}
                    </div>

                    <div className="author_list_info">
                      {!detailsLoaded ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <Link to={`/author/${ownerId}`}>{ownerName}</Link>
                      )}
                    </div>
                  </div>

                  <div className="spacer-20"></div>

                  {/* CREATOR */}
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      {!detailsLoaded ? (
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      ) : (
                        <img src={creatorImg} alt={creatorName} />
                      )}
                    </div>

                    <div className="author_list_info">
                      {!detailsLoaded ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <Link to={`/author/${creatorId}`}>{creatorName}</Link>
                      )}
                    </div>
                  </div>

                  <div className="spacer-20"></div>

                  {/* PRICE */}
                  <h6>Price</h6>
                  {!detailsLoaded ? (
                    <Skeleton width="80px" height="25px" />
                  ) : (
                    <div className="nft-item-price">
                      <span>{price} ETH</span>
                    </div>
                  )}

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