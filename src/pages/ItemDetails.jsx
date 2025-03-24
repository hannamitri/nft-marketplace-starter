import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorSection from "../components/item-details/AuthorSection";
import SkeletonItemDetails from "../components/UI/SkeletonItemDetails";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nftId) {
      fetchNftData();
    }
  }, [nftId]);

  async function fetchNftData() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setNftData(data);

    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || !nftData) return <SkeletonItemDetails />;

  const {
    title,
    description,
    nftImage,
    ownerName,
    ownerId,
    ownerImage,
    creatorName,
    creatorId,
    creatorImage,
    price,
    likes,
    views,
  } = nftData;

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
                  <h2 className="item_title">{title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>
                  <p>{description}</p>
                  <AuthorSection
                    title="Owner"
                    image={ownerImage}
                    name={ownerName}
                    id={ownerId}
                  />
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <AuthorSection
                        title="Creator"
                        image={creatorImage}
                        name={creatorName}
                        id={creatorId}
                      />
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ethereum" />
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
