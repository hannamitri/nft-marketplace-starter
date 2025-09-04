import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import FallbackNft from "../images/nftImage.jpg";

const ItemDetails = () => {
  const [sp] = useSearchParams();
  const nftId = sp.get("nftId");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!nftId) {
      setErr("Missing nftId — open /item-details?nftId=<id>");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails",
          { params: { nftId } }
        );
        setItem(data || null);
      } catch (e) {
        console.error("itemDetails fetch failed:", e);
        setErr("Failed to load item.");
      } finally {
        setLoading(false);
      }
    })();
  }, [nftId]);

  if (loading) return <div>Loading item…</div>;
  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!item) return <div>No item found.</div>;

  const {
    title,
    tag,
    nftImage,
    description,
    views,
    likes,
    price,
    ownerId,
    ownerImage,
    ownerName,
    creatorId,
    creatorImage,
    creatorName,
  } = item;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftImage || FallbackNft}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title || "NFT"}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {title || "Untitled"}{" "}
                    {tag ? (
                      <span style={{ fontWeight: 700 }}>#{tag}</span>
                    ) : null}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views ?? 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes ?? 0}
                    </div>
                  </div>

                  {description ? <p>{description}</p> : null}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author?authorId=${ownerId}`}>
                            <img
                              className="lazy"
                              src={ownerImage || AuthorImage}
                              alt={ownerName || "Owner"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author?authorId=${ownerId}`}>
                            {ownerName || "—"}
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
                          <Link to={`/author?authorId=${creatorId}`}>
                            <img
                              className="lazy"
                              src={creatorImage || AuthorImage}
                              alt={creatorName || "Creator"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author?authorId=${creatorId}`}>
                            {creatorName || "—"}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{price ?? "—"}</span>
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
