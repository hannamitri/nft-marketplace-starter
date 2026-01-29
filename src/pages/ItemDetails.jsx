import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import UserImagePlaceholder from "../components/UI/UserImagePlaceholder";
import axios from "axios";

const ItemDetails = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState({});

  function renderItemDetails() {
    return  <div className="row">
      <div className="col-md-6 text-center">
        <img
          src={item.nftImage}
          className="img-fluid img-rounded mb-sm-30 nft-image"
          alt=""
        />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2>{item.title} #{item.tag}</h2>
          <div className="item_info_counts">
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
                  <Link to={`/author/${item.ownerId}`} >
                    {item.ownerImage ? (
                      <img className="lazy" src={item.ownerImage} alt="" />
                    ) : (
                      <UserImagePlaceholder authorName={item.ownerName} />
                    )}
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to={`/author/${item.ownerId}`} >
                    {item.ownerName}
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
                  <Link to={`/author/${item.creatorId}`}>
                    {item.creatorImage ? (
                      <img className="lazy" src={item.creatorImage} alt="" />
                    ) : (
                      <UserImagePlaceholder authorName={item.creatorName} />
                    )}
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to={`/author/${item.creatorId}`}>
                    {item.creatorName}
                  </Link>
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
  };

  function renderSkeletonItemDetails() {
    return <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton width="100%" height="550px" />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <Skeleton width="350px" height="46px" />
          <div>
              <Skeleton width="150px" height="30px" />
          </div>
          <div>
            <Skeleton width="100%" height="78px" />
          </div>
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="author_list_info">
                  <Skeleton width="120px" height="21px" />
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
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="author_list_info">
                  <Skeleton width="120px" height="21px" />
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="nft-item-price">
              <Skeleton width="24px" height="24px" borderRadius="50%" />
              <span><Skeleton width="62px" height="36px" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  useEffect(() => {
    async function fetchItemDetails() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemID}`);
      setItem(data || {});
    }
    fetchItemDetails();
  }, [itemID])
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {item.nftImage ? (
              renderItemDetails()
            ) : (
              renderSkeletonItemDetails()
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
