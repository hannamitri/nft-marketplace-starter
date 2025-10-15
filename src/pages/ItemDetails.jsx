import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const API_ITEMS = "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
const API_AUTHOR = "https://us-central1-nft-cloud-functions.cloudfunctions.net/author";

const ItemDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const passedItem = state?.item;

  const [item, setItem] = useState(passedItem || null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(!passedItem);
  const [authorLoading, setAuthorLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (passedItem) return;
    try {
      const cached = sessionStorage.getItem("nft:selectedItem");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (!id || String(parsed?.id ?? "") === String(id)) {
          setItem(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {}
    setLoading(true);
    axios
      .get(API_ITEMS)
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        const found =
          arr.find((x) => String(x?.id ?? "") === String(id)) ??
          (Number.isFinite(Number(id)) ? arr[Number(id)] : null) ??
          null;
        setItem(found);
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id, passedItem]);

  useEffect(() => {
    if (!item?.authorId) {
      setAuthor(null);
      return;
    }
    setAuthorLoading(true);
    const tryFetch = async () => {
      const urls = [
        `${API_AUTHOR}?author=${encodeURIComponent(item.authorId)}`,
        `${API_AUTHOR}?authorId=${encodeURIComponent(item.authorId)}`,
        `${API_AUTHOR}?id=${encodeURIComponent(item.authorId)}`,
      ];
      for (const url of urls) {
        try {
          const { data } = await axios.get(url);
          if (data && typeof data === "object" && Object.keys(data).length) {
            setAuthor(Array.isArray(data) ? data[0] : data);
            return;
          }
        } catch {}
      }
      setAuthor(null);
    };
    tryFetch().finally(() => setAuthorLoading(false));
  }, [item?.authorId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div style={{ width: "100%", height: 420, borderRadius: 12, background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)", backgroundSize: "200% 100%", animation: "idShimmer 1.2s linear infinite" }} />
                </div>
                <div className="col-md-6">
                  <div style={{ height: 28, width: "60%", marginBottom: 16, background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)", backgroundSize: "200% 100%", animation: "idShimmer 1.2s linear infinite", borderRadius: 6 }} />
                  <div style={{ height: 16, width: 120, marginBottom: 24, background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)", backgroundSize: "200% 100%", animation: "idShimmer 1.2s linear infinite", borderRadius: 6 }} />
                  <div style={{ height: 80, width: "100%", marginBottom: 24, background: "linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%)", backgroundSize: "200% 100%", animation: "idShimmer 1.2s linear infinite", borderRadius: 8 }} />
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

  const preview = item.nftImage || nftImage;
  const title = item.title || "";
  const price = item.price;
  const likes = typeof item.likes === "number" ? item.likes : null;

  const authorName =
    author?.authorName ||
    author?.name ||
    author?.author ||
    author?.username ||
    (item.authorId ? "" : "Unknown");
  const authorImg = author?.authorImage || author?.image || item.authorImage || AuthorImage;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={preview}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {title && <h2>{title}</h2>}

                  {likes !== null && (
                    <div className="item_info_counts">
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {likes}
                      </div>
                    </div>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img className="lazy" src={authorImg} alt={authorName || "Author"} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">
                            {authorLoading ? "Loading..." : (authorName || "Unknown")}
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
                          <Link to="/author">
                            <img className="lazy" src={authorImg} alt={authorName || "Author"} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">
                            {authorLoading ? "Loading..." : (authorName || "Unknown")}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{price}</span>
                    </div>
                  </div>

                  {item.expiryDate ? <div className="spacer-20"></div> : null}
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