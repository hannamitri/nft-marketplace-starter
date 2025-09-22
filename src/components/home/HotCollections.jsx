import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections", { cache: "no-store" });
        const data = await res.json();
        if (alive && Array.isArray(data)) setCollections(data);
      } catch {}
    })();
    return () => { alive = false; };
  }, []);

  const items = collections.length ? collections.slice(0, 4) : new Array(4).fill(null);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {items.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={(item && (item.nftImage || item.cover || item.image)) || nftImage}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={(item && (item.authorImage || item.avatar)) || AuthorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{(item && (item.title || item.name)) || "Pinky Ocean"}</h4>
                  </Link>
                  <span>{(item && (item.code || item.standard || item.chain)) || "ERC-192"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
