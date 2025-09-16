import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id: nftId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">

              {/* skeleton img */}

              <Skeleton width="100%" height="300px" borderRadius="8px" />
            </div>
            {/* skeleton details */}

            <div className="col-md-6">
              <div className="item_info">
                <Skeleton width="60%" height="32px" />
                {/* skeleton views and likes */}

                <div className="d-flex align-items-center mt-2 mb-3">
                  <Skeleton width="40px" height="20px" className="mb-4" />
                  <Skeleton width="40px" height="20px" />
                </div>

                {/* skeleton description */}

                <Skeleton width="100%" height="16px" className="mb-1" />
                <Skeleton width="100%" height="16px" className="mb-1" />
                <Skeleton width="80%" height="16px" />
                {/* skeleton owner */}

                <div className="d-flex align-items-center mb-3">
                  <Skeleton width="50px" height="50px" />
                  <Skeleton width="120px" height="16px" className="ms-3" />
                </div>

                {/* skeleton creator */}

                <div className="d-flex align-items-center mb-3">
                  <Skeleton width="120px" height="16px" className="mt-3" />
                </div>

                {/* skeleton price */}

                <Skeleton width="100px" height="32px" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  const {
    title,
    description,
    nftImage,
    ownerName,
    ownerImage,
    creatorName,
    creatorImage,
    price,
    likes,
    views,
  } = data;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">

                  {/* title */}

                  <h2>{title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">

                      {/* views */}

                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">

                      {/* likes */}

                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>

                  {/* description */}

                  <p>{description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">

                          {/* owner image  */}

                          <Link to="/author">
                            <img
                              className="lazy"
                              src={ownerImage}
                              alt={ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">

                          {/* owner name */}

                          <Link to="/author">{ownerName}</Link>
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

                          {/* creator image */}

                          <Link to="/author">
                            <img className="lazy" src={creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">

                          {/* creator name */}

                          <Link to="/author">{creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>

                    {/* price */}
                    
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{price}</span>
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
