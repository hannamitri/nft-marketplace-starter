import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import "./ItemDetails.css";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchItemsData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`,
      );
      setItemDetails(data);
    } catch (error) {
      console.log("Error fetching API data", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemsData();
  }, [fetchItemsData]);

  function skeletonLoader() {
    return (
      <div className="row">
        <div className="col-md-6 text-center">
          <div className="skeleton-box skeleton-image" />
        </div>
        <div className="col-md-6">
          <div className="item_info">
            <div className="skeleton-box skeleton-title" />
            <div className="skeleton-counts">
              <div className="skeleton-box skeleton-count" />
              <div className="skeleton-box skeleton-count" />
            </div>
            <div className="skeleton-box skeleton-line" />
            <div className="skeleton-box skeleton-line" />
            <div className="skeleton-box skeleton-line-short" />
            <div className="skeleton-author">
              <div className="skeleton-box skeleton-avatar" />
              <div className="skeleton-box skeleton-name" />
            </div>
            <div className="skeleton-author-last">
              <div className="skeleton-box skeleton-avatar" />
              <div className="skeleton-box skeleton-name" />
            </div>
            <div className="skeleton-box skeleton-price" />
          </div>
        </div>
      </div>
    );
  }

  function renderItemDetails(item) {
    return (
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={item?.nftImage}
            className="img-fluid img-rounded mb-sm-30 nft-image"
            alt=""
          />
        </div>
        <div className="col-md-6">
          <div className="item_info">
            <h2>
              {item?.title} #{item?.tag}
            </h2>
            <div className="item_info_counts">
              <div className="item_info_views">
                <i className="fa fa-eye"></i>
                {item?.views}
              </div>
              <div className="item_info_like">
                <i className="fa fa-heart"></i>
                {item?.likes}
              </div>
            </div>
            <p>{item?.description}</p>
            <div className="d-flex flex-row">
              <div className="mr40">
                <h6>Owner</h6>
                <div className="item_author">
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img className="lazy" src={item?.ownerImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item?.ownerName}</Link>
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
                      <img className="lazy" src={item?.creatorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item?.creatorName}</Link>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <h6>Price</h6>
              <div className="nft-item-price">
                <img src={EthImage} alt="" />
                <span>{item?.price}</span>
              </div>
            </div>
          </div>
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
            {isLoading ? skeletonLoader() : renderItemDetails(itemDetails)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
