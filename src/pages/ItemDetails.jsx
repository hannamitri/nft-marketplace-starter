import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import "./ItemDetails.css";


const ITEM_DETAILS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";


function pickImage(item) {
  return (
    item?.nftImage ||
    item?.image ||
    item?.cover ||
    item?.banner ||
    item?.img ||
    item?.imageUrl ||
    item?.nftImageUrl ||
    nftImage
  );
}

const ItemDetailsSkeleton = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <div className="ids-skel-img" />
      </div>

      <div className="col-md-6">
        <div className="item_info">
          <div className="ids-skel-title" />

          <div className="item_info_counts">
            <div className="ids-skel-pill" />
            <div className="ids-skel-pill" />
          </div>

          <div className="ids-skel-line" />
          <div className="ids-skel-line" />
          <div className="ids-skel-line short" />

          <div className="d-flex flex-row" style={{ marginTop: 20 }}>
            <div className="mr40">
              <div className="ids-skel-subtitle" />
              <div className="ids-skel-author" />
            </div>
            <div>
              <div className="ids-skel-subtitle" />
              <div className="ids-skel-author" />
            </div>
          </div>

          <div className="spacer-40"></div>
          <div className="ids-skel-subtitle" />
          <div className="ids-skel-price" />
        </div>
      </div>
    </div>
  );
};

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        setErr("");

        const { data } = await axios.get(ITEM_DETAILS_URL, {
          params: { nftId },
        });

        setItem(data ?? null);
      } catch (e1) {
        try {
          const { data } = await axios.get(`${ITEM_DETAILS_URL}/${nftId}`);
          setItem(data ?? null);
        } catch (e2) {
          console.error(e2);
          setErr("Could not load item details.");
          setItem(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [nftId]);

  const imageSrc = pickImage(item);
  const title = item?.title || item?.name || "Item";
  const views = item?.views ?? 0;
  const likes = item?.likes ?? 0;
  const description = item?.description || "";
  const ownerName = item?.owner?.name || item?.ownerName || "—";
  const ownerImage =
    item?.owner?.image || item?.ownerImage || item?.owner?.profileImage || AuthorImage;

  const creatorName = item?.creator?.name || item?.creatorName || "—";
  const creatorImage =
    item?.creator?.image || item?.creatorImage || item?.creator?.profileImage || AuthorImage;

  const price = item?.price ?? "—";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {}
            {loading && <ItemDetailsSkeleton />}

            {}
            {!loading && err && (
              <div className="row">
                <div className="col-12 text-center">
                  <p>{err}</p>
                  <Link to="/">Go back</Link>
                </div>
              </div>
            )}

            {}
            {!loading && !err && item && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={imageSrc}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={title}
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{title}</h2>

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
                            <Link to="/author">
                              <img className="lazy" src={ownerImage} alt={ownerName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
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
                            <Link to="/author">
                              <img className="lazy" src={creatorImage} alt={creatorName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{creatorName}</Link>
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
            )}

            {}
            {!loading && !err && !item && (
              <div className="row">
                <div className="col-12 text-center">
                  <p>No item found.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
