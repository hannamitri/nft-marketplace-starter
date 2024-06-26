import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });

    const fetchItemDetails = async () => {
      try {
        console.log("Fetching item details for ID:", id);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        console.log("Response data:", response.data);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right">
                {loading ? (
                  <Skeleton height={400} width={400} />
                ) : (
                  <img
                    src={item.nftImage || "path/to/defaultImage.jpg"}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title || "NFT Image"}
                  />
                )}
              </div>
              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  <h2>{loading ? <Skeleton width={200} /> : item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width={40} /> : item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width={40} /> : item.likes}
                    </div>
                  </div>
                  <p>{loading ? <Skeleton count={3} /> : item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${loading ? "#" : item.ownerId}`}>
                            {loading ? (
                              <Skeleton circle={true} height={50} width={50} />
                            ) : (
                              <img className="lazy" src={item.ownerImage || AuthorImage} alt="" />
                            )}
                            {!loading && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${loading ? "#" : item.ownerId}`}>
                            {loading ? <Skeleton width={100} /> : item.ownerName}
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
                          <Link to={`/author/${loading ? "#" : item.creatorId}`}>
                            {loading ? (
                              <Skeleton circle={true} height={50} width={50} />
                            ) : (
                              <img className="lazy" src={item.creatorImage || AuthorImage} alt="" />
                            )}
                            {!loading && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${loading ? "#" : item.creatorId}`}>
                            {loading ? <Skeleton width={100} /> : item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={60} />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </>
                      )}
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
