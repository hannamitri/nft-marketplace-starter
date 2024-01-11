import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";
const ItemDetails = () => {
  const { nftId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setDetails(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            
            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                <Skeleton width={500} height={550} borderRadius={0} />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                    <Skeleton width={300} height={50} borderRadius={0} />
                    </h2>

                    <div className="item_info_counts">         
                      <Skeleton width={50} height={30} borderRadius={0} />
                      <Skeleton width={50} height={30} borderRadius={0} />
                    </div>
                    <p>
                    <Skeleton width={400} height={100} borderRadius={0} />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                      <Skeleton width={60} height={20} borderRadius={0} />
                        <div className="item_author">
                          <div className="author_list_pp">
                          <Skeleton width={50} height={50} borderRadius={100} />
                          </div>
                          <div className="author_list_info">
                          <Skeleton width={60} height={20} borderRadius={0} />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <Skeleton width={60} height={20} borderRadius={0} />
                        <div className="item_author">
                          <div className="author_list_pp">
                          <Skeleton width={50} height={50} borderRadius={100} />
                          </div>
                          <div className="author_list_info">
                          <Skeleton width={60} height={20} borderRadius={0} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <Skeleton width={40} height={15} borderRadius={0} />
                      <div className="nft-item-price">
                        <Skeleton width={100} height={35} borderRadius={0} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={details.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6" key={details.id}>
                  <div className="item_info">
                    <h2>{details.title} #{details.tag}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {details.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {details.likes}
                      </div>
                    </div>
                    <p>
                      {details.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${details.ownerId}`}>
                              <img className="lazy" src={details.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${details.ownerId}`}>{details.ownerName}</Link>
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
                            <Link to={`/author/${details.creatorId}`}>
                              <img className="lazy" src={details.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${details.creatorId}`}>{details.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{details.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
