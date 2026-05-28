import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
 
const { nftId } = useParams();
const [details, setDetails] = useState([]);
const [loading, setLoading] = useState(true);

 useEffect (() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        const data = response.data;

        setDetails(response.data);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      window.scrollTo(0, 0);
    };

    fetchDetails();
  }, [nftId]);

  if (loading) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              
              <div className="col-md-6 text-center">
                <div className="skeleton-detail-image skeleton"></div>
              </div>

              <div className="col-md-6">
                <div className="item_info">

                  <div className="skeleton-detail-title skeleton"></div>

                  <div className="item_info_counts">
                    <div className="skeleton-detail-stat skeleton"></div>
                    <div className="skeleton-detail-stat skeleton"></div>
                  </div>

                  <div className="skeleton-detail-text skeleton"></div>
                  <div className="skeleton-detail-text skeleton"></div>
                  <div className="skeleton-detail-text short skeleton"></div>

                  <div className="d-flex flex-row mt-4">
                    <div className="mr40">
                      <div className="skeleton-detail-label skeleton"></div>

                      <div className="item_author">
                        <div className="skeleton-detail-avatar skeleton"></div>

                        <div className="author_list_info">
                          <div className="skeleton-detail-name skeleton"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="spacer-40"></div>

                  <div className="skeleton-detail-label skeleton"></div>

                  <div className="nft-item-price">
                    <div className="skeleton-detail-eth skeleton"></div>
                    <div className="skeleton-detail-price skeleton"></div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
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
                  src={details.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
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
                          <Link to="/author">
                            <img className="lazy" src={AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Monica Lucas</Link>
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
                          <Link to="/author">
                            <img className="lazy" src={AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Monica Lucas</Link>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
