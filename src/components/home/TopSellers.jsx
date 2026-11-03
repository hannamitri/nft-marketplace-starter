import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "./TopSellers.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const loadSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Top sellers request failed");
        const data = await response.json();
        // Fail closed on malformed data rather than display invented sellers.
        if (!Array.isArray(data) || !data.every((seller) =>
          seller && Number.isFinite(seller.id) && Number.isFinite(seller.authorId) &&
          typeof seller.authorName === "string" && seller.authorName.trim() &&
          typeof seller.authorImage === "string" && seller.authorImage.trim() &&
          Number.isFinite(seller.price) && seller.price >= 0
        )) throw new Error("Invalid top sellers response");
        if (!controller.signal.aborted) {
          setSellers(data);
          setStatus("success");
        }
      } catch (error) {
        if (!controller.signal.aborted) setStatus("error");
      }
    };
    loadSellers();
    return () => controller.abort();
  }, []);

  return (
    <section id="section-popular" className="pb-5" aria-labelledby="top-sellers-heading" aria-busy={status === "loading"}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 id="top-sellers-heading">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {status === "loading" && <>
              <p role="status" className="top-sellers-sr-only">Loading top sellers…</p>
              <ol className="author_list top-sellers-skeletons" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => (
                  <li key={index}>
                    <div className="author_list_pp"><Skeleton width="50px" height="50px" borderRadius="50%" /></div>
                    <div className="author_list_info">
                      <Skeleton width="75%" height="18px" />
                      <div><Skeleton width="40%" height="14px" /></div>
                    </div>
                  </li>
                ))}
              </ol>
            </>}
            {status === "error" && <p role="alert" className="text-center">Unable to load top sellers. Please try again later.</p>}
            {status === "success" && sellers.length === 0 && <p role="status" className="text-center">No top sellers available.</p>}
            {status === "success" && sellers.length > 0 && <ol className="author_list" aria-label="Top sellers">
              {sellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author?authorId=${seller.authorId}`} aria-label={`View ${seller.authorName}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author?authorId=${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
