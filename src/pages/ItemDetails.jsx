import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API}?nftId=${id}`);
        const data = await res.json();
        setItem(data);
      } catch (e) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="400px" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="300px" height="40px" style={{ marginBottom: "20px" }} />
                    <Skeleton width="150px" height="20px" style={{ marginBottom: "20px" }} />
                    <Skeleton width="100%" height="80px" style={{ marginBottom: "20px" }} />
                    <Skeleton width="200px" height="30px" style={{ marginBottom: "10px" }} />
                    <Skeleton width="100%" height="60px" style={{ marginBottom: "20px" }} />
                    <Skeleton width="200px" height="30px" style={{ marginBottom: "10px" }} />
                    <Skeleton width="100%" height="60px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) return <div style={{ padding: 40 }}>Not found</div>;

  const title = item.title || "Untitled";
  const tag = item.tag || "";
  const nftImage = item.nftImage || "";

  const views = item.views ?? 0;
  const likes = item.likes ?? 0;

  const description = item.description || "";

  const ownerId = item.ownerId || item.authorId || "";
  const ownerName = item.ownerName || item.owner || `Author #${ownerId}` || "Unknown";
  const ownerImage = item.ownerImage || item.authorImage || "";

  const creatorId = item.creatorId || item.authorId || "";
  const creatorName = item.creatorName || item.creator || `Author #${creatorId}` || "Unknown";
  const creatorImage = item.creatorImage || item.authorImage || "";

  const price = item.price ?? "—";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* LEFT: NFT IMAGE */}
              <div className="col-md-6 text-center">
                <img
                  src={nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={`${title} ${tag}`.trim()}
                />
              </div>

              {/* RIGHT: INFO */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {title} {tag}
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
                          <Link to={`/author/${ownerId}`}>
                            <img className="lazy" src={ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${ownerId}`}>{ownerName}</Link>
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
                          <Link to={`/author/${creatorId}`}>
                            <img className="lazy" src={creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creatorId}`}>{creatorName}</Link>
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
              {/* /RIGHT */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;