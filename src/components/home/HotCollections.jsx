import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const loading = items.length === 0;

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => setItems(Array.isArray(res.data) ? res.data.slice(0, 4) : []))
      .catch(() => setItems([]));
  }, []);

  const data = loading ? new Array(4).fill(null) : items;

  return (
    <section id="section-collections" className="no-bottom">
      <style>{`
        @keyframes hcShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .hc-skel{background:linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%);background-size:200% 100%;animation:hcShimmer 1.2s linear infinite}
      `}</style>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {data.map((it, index) => {
            const title = it?.title ?? "Pinky Ocean";
            const img = it?.nftImage ?? nftImage;
            const aimg = it?.authorImage ?? AuthorImage;
            const authorId = it?.authorId ?? "";
            const code = it?.code ?? 192;
            const nftId = it?.nftId ?? "";

            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    {it ? (
                      <Link to={nftId ? `/item-details/${nftId}` : "/item-details"}>
                        <img src={img} className="lazy img-fluid" alt={title} />
                      </Link>
                    ) : (
                      <div className="hc-skel" style={{ width: "100%", paddingTop: "75%", borderRadius: 8 }} />
                    )}
                  </div>

                  <div className="nft_coll_pp">
                    {it ? (
                      <Link to={authorId ? `/author/${authorId}` : "/author"}>
                        <img className="lazy pp-coll" src={aimg} alt={title} />
                      </Link>
                    ) : (
                      <div className="hc-skel" style={{ width: 60, height: 60, borderRadius: "50%" }} />
                    )}
                    {it && <i className="fa fa-check"></i>}
                  </div>

                  <div className="nft_coll_info">
                    {it ? (
                      <>
                        <Link to="/explore">
                          <h4>{title}</h4>
                        </Link>
                        <span>{`ERC-${code}`}</span>
                      </>
                    ) : (
                      <>
                        <div className="hc-skel" style={{ height: 20, width: "70%", borderRadius: 6, marginBottom: 8 }} />
                        <div className="hc-skel" style={{ height: 14, width: "40%", borderRadius: 6 }} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
