import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const [collections, setCollections] = useState([]);
  const { nftId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData({ data });
      setIsLoading(false);
    }, 2000);
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      console.log(data);
      setCollections(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div data-aos="fade-up" className="col-md-6 text-center">
                <img
                  src={collections.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div data-aos="fade-up" className="col-md-6">
                <div data-aos="fade-up" className="item_info">
                  <h2>{collections.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {collections.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {collections.likes}
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
                      <ol className="author_list">
                        <li>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${collections.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={collections.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${collections.ownerId}`}>
                                {collections.ownerName}
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ol>{" "}
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${collections.creatorId}`}>
                            <img
                              className="lazy"
                              src={collections.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${collections.creatorId}`}>
                            {collections.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{collections.price}</span>
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