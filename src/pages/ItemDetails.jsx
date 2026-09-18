import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      )
  .then((response) => {
  const selectedCollection = response.data.find(
    (item) => item.id === Number(id)
  );

  setCollection(selectedCollection);
})
      .catch((error) => {
        console.error("Error fetching collection:", error);
      });
  }, [id]);

  if (!collection) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* NFT Image */}
              <div className="col-md-6">
                <Skeleton width="100%" height="500px" />
              </div>

              {/* NFT Information */}
              <div className="col-md-6">
                <div className="item_info">

                  {/* Title */}
                  <Skeleton width="55%" height="45px" />

                  {/* Views and Likes */}
                  <div className="skeleton-counts">
                    <Skeleton width="110px" height="48px" />
                    <Skeleton width="110px" height="48px" />
                  </div>

                  {/* Description */}
                  <div className="skeleton-description">
                    <Skeleton width="100%" height="18px" />
                    <Skeleton width="95%" height="18px" />
                    <Skeleton width="75%" height="18px" />
                  </div>

                  {/* Owner */}
                  <div className="skeleton-section">
                    <Skeleton width="70px" height="20px" />

                    <div className="skeleton-author">
                      <Skeleton width="50px" height="50px" />
                      <Skeleton width="140px" height="22px" />
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="skeleton-section">
                    <Skeleton width="75px" height="20px" />

                    <div className="skeleton-author">
                      <Skeleton width="50px" height="50px" />
                      <Skeleton width="140px" height="22px" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="skeleton-section">
                    <Skeleton width="55px" height="20px" />
                    <Skeleton width="100px" height="35px" />
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
                  src={collection.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{collection.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      74
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
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                           <img
                              className="lazy"
                              src={collection.authorImage}
                              alt=""
                            />
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
                            <img
                              className="lazy"
                              src={collection.authorImage}
                              alt=""
                            />
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
                    <img src={EthImage} alt="Ethereum" />
                      <span>1.85</span>
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
