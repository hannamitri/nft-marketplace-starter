import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

export default function AuthorItems() {
  const { authorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${ENDPOINT}?author=${encodeURIComponent(authorId ?? "")}`)
      .then((res) => {
        if (!mounted) return;
        const data = res?.data ?? {};
        setAuthor(data);
        setItems(Array.isArray(data?.nftCollection) ? data.nftCollection : []);
      })
      .catch(() => {
        if (!mounted) return;
        setAuthor(null);
        setItems([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          <style>{`
            @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
            .skeleton{background:linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%);background-size:200% 100%;animation:shimmer 1.2s linear infinite;border-radius:8px;}
          `}</style>

          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={`sk-${index}`}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div
                        className="skeleton"
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    </div>
                    <div className="nft__item_wrap">
                      <div
                        className="skeleton"
                        style={{
                          width: "100%",
                          paddingTop: "100%",
                          borderRadius: 12,
                        }}
                      />
                    </div>
                    <div className="nft__item_info">
                      <div
                        className="skeleton"
                        style={{ width: "70%", height: 16, marginBottom: 8 }}
                      />
                      <div
                        className="skeleton"
                        style={{ width: 90, height: 14 }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : items.map((it, index) => {
                const nftId = it?.nftId ?? it?.id ?? index;
                const title = it?.title || it?.name || `Item #${index + 1}`;
                const price =
                  typeof it?.price === "number"
                    ? `${it.price} ETH`
                    : it?.price || "—";
                const likes = it?.likes ?? 0;
                const img = it?.nftImage || it?.image || nftImage;
                const avatar = author?.authorImage || AuthorImage;
                const displayName =
                  author?.author || author?.authorName || "Unknown";

                return (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={String(nftId)}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="">
                          <img
                            className="lazy"
                            src={avatar}
                            alt={displayName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {it?.ending || it?.deadline || it?.expiryDate ? (
                        <div className="de_countdown"></div>
                      ) : null}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <Link to={`/item-details/${nftId}`}>
                          <img
                            src={img}
                            className="lazy nft__item_preview"
                            alt={title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${nftId}`}>
                          <h4>{title}</h4>
                        </Link>
                        <div className="nft__item_price">{price}</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}