import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { ItemDetailsSkeleton } from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        setNftData(response.data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTData();
  }, [nftId]);

  if (loading) {
    return <ItemDetailsSkeleton />;
  }

  if (!nftData) {
    return <ItemDetailsSkeleton />;
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
                  src={nftData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nftData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nftData.title} #{nftData.nftId}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData.likes}
                    </div>
                  </div>
                  <p>{nftData.description}</p>
                  <div className="item__details--flex-row">
                    <div className="item__details--margin-right">
                      <h6>Owner</h6>
                      <div className="item__details--author">
                        <div className="item__details--author__avatar">
                          <Link to={`/author/${nftData.ownerId}`}>
                            <img
                              className="lazy"
                              src={nftData.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="item__details--author__info">
                          <Link to={`/author/${nftData.ownerId}`}>
                            {nftData.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="item__details--tab tab_simple">
                    <div className="item__details--tab__content">
                      <h6>Creator</h6>
                      <div className="item__details--author">
                        <div className="item__details--author__avatar">
                          <Link to={`/author/${nftData.creatorId}`}>
                            <img
                              className="lazy"
                              src={nftData.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="item__details--author__info">
                          <Link to={`/author/${nftData.creatorId}`}>
                            {nftData.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="item__details--spacer"></div>
                    <h6>Price</h6>
                    <div className="item__details--price">
                      <img src={EthImage} alt="" />
                      <span>{nftData.price}</span>
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
