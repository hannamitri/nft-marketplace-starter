import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        const data = await res.json();
        if (alive) setItem(data || null);
      } catch {
        if (alive) setItem(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <section id="section-item-details" className="no-top">
      <div className="container item-details">
        <div className="row">
          <div className="col-md-6">
            {loading ? (
              <div className="skeleton-box itemd-cover" />
            ) : item ? (
              <img
                src={item.nftImage || ""}
                className="img-fluid img-rounded mb-sm-30 nft-image"
                alt=""
              />
            ) : null}
          </div>

        <div className="col-md-6">
          {loading ? (
            <div>
              <div className="skeleton-box sk-title" />
              <div className="skeleton-box sk-price" />
              <div className="d-flex align-items-center mb-3" style={{ gap: 12 }}>
                <div className="skeleton-box sk-avatar" />
                <div style={{ flex: 1 }}>
                  <div className="skeleton-box sk-line" />
                  <div className="skeleton-box sk-line" />
                </div>
              </div>
              <div className="skeleton-box sk-line" />
              <div className="skeleton-box sk-line" />
              <div className="skeleton-box sk-line" />
              <div className="mt-3">
                <span className="skeleton-box sk-button" />
                <span className="skeleton-box sk-button" />
              </div>
            </div>
          ) : item ? (
            <div className="item_info">
              <h2>{item.title}</h2>

              <div className="d-flex align-items-center mb-3" style={{ gap: 12 }}>
                <Link to={`/author/${item.authorId || ""}`}>
                  <img className="lazy pp-coll" src={item.authorImage || ""} alt="" />
                </Link>
                <div>
                  <h6 className="m-0">{item.author || ""}</h6>
                  <span>{item.code ? `ERC-${item.code}` : item.token || ""}</span>
                </div>
              </div>

              <p>{item.description}</p>
              <div className="nft-item-price">{item.price ? `${item.price} ETH` : ""}</div>
            </div>
          ) : (
            <div style={{ opacity: 0.8 }}>Item not found.</div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
