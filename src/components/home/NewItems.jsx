import React, { useEffect, useState } from "react";
import NftCardSkeleton from "../common/NftCardSkeleton";
import NftItemCard from "../explore/NftItemCard";
import {
  EXPLORE_API_URL,
  SKELETON_MIN_MS,
} from "../../constants/exploreApi";
import { withMinDelay } from "../../utils/withMinDelay";

const HOME_NEW_ITEMS_COUNT = 4;

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await withMinDelay(
          SKELETON_MIN_MS,
          (async () => {
            const res = await fetch(EXPLORE_API_URL);
            if (!res.ok) {
              throw new Error(`Request failed (${res.status})`);
            }
            const json = await res.json();
            if (!Array.isArray(json)) {
              throw new Error("Invalid response shape");
            }
            return json;
          })()
        );
        if (cancelled) return;
        setItems(data.slice(0, HOME_NEW_ITEMS_COUNT));
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load new items");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading &&
            Array.from({ length: HOME_NEW_ITEMS_COUNT }, (_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={`skeleton-${index}`}
              >
                <NftCardSkeleton />
              </div>
            ))}
          {error && (
            <div className="col-md-12 text-center py-4 text-danger">
              {error}
            </div>
          )}
          {!loading &&
            !error &&
            items.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id}
              >
                <NftItemCard
                  authorImage={item.authorImage}
                  nftImage={item.nftImage}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  expiryDate={item.expiryDate}
                  nftId={item.nftId}
                  authorId={item.authorId}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
