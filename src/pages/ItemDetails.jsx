import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const DETAILS_API = "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";
const LIST_API = "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const ItemDetails = () => {
  const { id: routeParam } = useParams();
  const { state } = useLocation();
  const passedItem = state?.item || null;

  const [item, setItem] = useState(passedItem);
  const [loading, setLoading] = useState(!passedItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (passedItem) {
      setItem(passedItem);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      const paramNum = Number(routeParam);
      const tryDetailsFirst = Number.isFinite(paramNum) && paramNum > 0;
      try {
        if (tryDetailsFirst) {
          const { data } = await axios.get(`${DETAILS_API}?nftId=${encodeURIComponent(paramNum)}`);
          if (data && typeof data === "object" && Object.keys(data).length) {
            setItem(data);
            setLoading(false);
            return;
          }
        }
        const listRes = await axios.get(LIST_API);
        const arr = Array.isArray(listRes.data) ? listRes.data : [];
        let found = null;
        if (Number.isFinite(paramNum)) {
          found =
            arr.find((x) => String(x?.nftId ?? "") === String(paramNum)) ||
            arr.find((x) => String(x?.id ?? "") === String(paramNum)) ||
            null;
        }
        if (!found && routeParam) {
          found =
            arr.find((x) => String(x?.title ?? "").toLowerCase().includes(String(routeParam).toLowerCase())) ||
            null;
        }
        if (found?.nftId) {
          try {
            const { data } = await axios.get(`${DETAILS_API}?nftId=${encodeURIComponent(found.nftId)}`);
            if (data && typeof data === "object" && Object.keys(data).length) {
              setItem(data);
              setLoading(false);
              return;
            }
          } catch {}
        }
        setItem(found || null);
      } catch {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [routeParam, passedItem]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    style={{
                      width: "100%",
                      height: 420,
                      borderRadius: 12,
                      background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                      backgroundSize: "200% 100%",
                      animation: "idShimmer 1.2s linear infinite",
                      marginBottom: 24
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div
                    style={{
                      height: 32,
                      width: "70%",
                      borderRadius: 8,
                      background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                      backgroundSize: "200% 100%",
                      animation: "idShimmer 1.2s linear infinite",
                      marginBottom: 16
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      marginBottom: 16
                    }}
                  >
                    <div
                      style={{
                        height: 16,
                        width: 80,
                        borderRadius: 6,
                        background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                        backgroundSize: "200% 100%",
                        animation: "idShimmer 1.2s linear infinite"
                      }}
                    />
                    <div
                      style={{
                        height: 16,
                        width: 80,
                        borderRadius: 6,
                        background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                        backgroundSize: "200% 100%",
                        animation: "idShimmer 1.2s linear infinite"
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: 80,
                      width: "100%",
                      borderRadius: 10,
                      background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                      backgroundSize: "200% 100%",
                      animation: "idShimmer 1.2s linear infinite",
                      marginBottom: 24
                    }}
                  />
                  <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                          backgroundSize: "200% 100%",
                          animation: "idShimmer 1.2s linear infinite"
                        }}
                      />
                      <div
                        style={{
                          width: 120,
                          height: 16,
                          borderRadius: 6,
                          background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                          backgroundSize: "200% 100%",
                          animation: "idShimmer 1.2s linear infinite"
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                          backgroundSize: "200% 100%",
                          animation: "idShimmer 1.2s linear infinite"
                        }}
                      />
                      <div
                        style={{
                          width: 120,
                          height: 16,
                          borderRadius: 6,
                          background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)",
                          backgroundSize: "200% 100%",
                          animation: "idShimmer 1.2s linear infinite"
                        }}
                      />
                    </div>
                  </div>
                  <style>{`@keyframes idShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <h3 className="text-center">Item not found.</h3>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const title = item.title || "";
  const description = item.description || "";
  const views = typeof item.views === "number" ? item.views : null;
  const likes = typeof item.likes === "number" ? item.likes : null;
  const price = item.price ?? "";
  const ownerId = item.ownerId;
  const ownerName = item.ownerName;
  const ownerImg = item.ownerImage || AuthorImage;
  const creatorId = item.creatorId;
  const creatorName = item.creatorName;
  const creatorImg = item.creatorImage || AuthorImage;
  const image = item.nftImage || nftImage;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img src={image} className="img-fluid img-rounded mb-sm-30 nft-image" alt={title} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>
                  <div className="item_info_counts">
                    {views !== null && (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {views}
                      </div>
                    )}
                    {likes !== null && (
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {likes}
                      </div>
                    )}
                  </div>
                  {description ? <p>{description}</p> : null}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={ownerId ? `/author/${ownerId}` : "/author"}>
                            <img className="lazy" src={ownerImg} alt={ownerName || ""} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={ownerId ? `/author/${ownerId}` : "/author"}>
                            {ownerName || ""}
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
                          <Link to={creatorId ? `/author/${creatorId}` : "/author"}>
                            <img className="lazy" src={creatorImg} alt={creatorName || ""} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={creatorId ? `/author/${creatorId}` : "/author"}>
                            {creatorName || ""}
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
