import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id: nftId } = useParams();

  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        if (!nftId) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await res.json();

        setItemData(data.nft || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                {new Array(4).fill(0).map((_, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={i}
                  >
                    <Skeleton />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section className="mt90 sm-mt-0">
            <div className="container">
              <h2>Item not found</h2>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const title = itemData.title || "Untitled";
  const displayId = itemData?.tag ?? itemData?.nftId ?? itemData?.id ?? "";
  const views = itemData.views || 0;
  const likes = itemData.likes || 0;
  const description = itemData.description || "";
  const price = itemData.price || 0;

  const nftImage = itemData.nftImage || "";
  const ownerName = itemData.ownerName || itemData.authorName || "Unknown Owner";
  const ownerImage = itemData.ownerImage || itemData.authorImage || "";
  const ownerId = itemData.ownerId || itemData.authorId || "";

  const creatorName =
    itemData.creatorName || itemData.authorName || "Unknown Creator";
  const creatorImage = itemData.creatorImage || itemData.authorImage || "";
  const creatorId = itemData.creatorId || itemData.authorId || "";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right">
                <img
                  src={nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>

              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  <h2>
                    {title} #{displayId}
                  </h2>

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

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={ownerId ? `/author/${ownerId}` : "#"}>
                            <img
                              className="lazy"
                              src={ownerImage}
                              alt={ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={ownerId ? `/author/${ownerId}` : "#"}>
                            {ownerName}
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
                          <Link to={creatorId ? `/author/${creatorId}` : "#"}>
                            <img
                              className="lazy"
                              src={creatorImage}
                              alt={creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={creatorId ? `/author/${creatorId}` : "#"}>
                            {creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

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