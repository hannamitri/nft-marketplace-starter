import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";
import Filter from "../Filter";


//For merge - after animation - For merge

// FROM MAIN!!! DO NOT REMOVE!!!

const ExploreItems = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter" || ""); //price_low_to_high etc.

  const [data, setData] = useState([]); // [] over null -> won't have null data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setLoading(true);
    const base =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    const url = filter ? `${base}?filter=${filter}` : base;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [filter]);

  if (error) {
    return (
      <div className="text-center p-5">
        <p className="text-danger">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div data-aos='fade-in' className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <Filter id="filter-items" className="form-select" />
          </div>
          {/* loading state */}

          {loading
            ? Array.from({ length: visibleCount }).map((_, index) => (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="40px" height="40px" borderRadius="50%" />
                    </div>
                    <div className="nft_item_wrap">
                      <Skeleton
                        width="100px"
                        height="200px"
                        borderRadius="12px"
                      />
                    </div>
                    <div className="nft_item_info">
                      <Skeleton width="80%" height="20px" borderRadius="4px" />
                      <Skeleton width="60%" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))
            : data.slice(0, visibleCount).map((item) => (
                <div
                  key={item.nftId}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <NftCard item={item} />
                </div>
              ))}
          {/* load more */}
          {visibleCount < data.length && (
            <div className="col-md-12 text-center">
              <Link
                to=""
                id="loadmore"
                className="btn-main lead"
                onClick={() => setVisibleCount((prev) => prev + 4)}
              >
                Load more
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreItems;
