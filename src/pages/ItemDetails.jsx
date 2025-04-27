import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import ItemDetailsSkeleton from "../components/item/ItemDetailsSkeleton";
import { getItemDetails } from "../api/api";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getItemDetails(nftId);
        if (data) {
          setItemData(data);
        } else {
          setError("Failed to fetch NFT details");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching NFT details");
      } finally {
        setLoading(false);
      }
    };
    if (nftId) {
      fetchItemDetails();
    }
  }, [nftId]);
  

  if (loading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3>Error: {error}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3>NFT not found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper" className="item-details-page">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemData.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemData.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemData.likes || 0}
                    </div>
                  </div>
                  <p>{itemData.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.ownerId}`}>
                            <img
                              className="lazy"
                              src={itemData.ownerImage || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.authorId}`}>
                            {itemData.owner?.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.creatorId}`}>
                            <img
                              className="lazy"
                              src={itemData.creatorImage || AuthorImage}
                              alt=""
                            />
                          </Link>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.creator?.authorId}`}>
                            {itemData.creator?.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemData.price}</span>
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
