// pages/explore.jsx
import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const EXPLORE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const Explore = () => {
  const [allItems, setAllItems] = useState([]); // full API list
  const [visibleCount, setVisibleCount] = useState(8); // 8 on mount
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(EXPLORE_URL, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Expecting 16 items from the endpoint
        setAllItems(Array.isArray(data) ? data : []);
        setVisibleCount(8); // reset to first 8 whenever we refetch
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  const handleLoadMore = () => {
    // +4, but never exceed total
    setVisibleCount((c) => Math.min(c + 4, allItems.length));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading && !err && (
                <>
                  <div className="col-12 mb-3">
                    <select id="filter-items" disabled defaultValue="">
                      <option value="">Default</option>
                    </select>
                  </div>

                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`sk-explore-${i}`}
                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      style={{ display: "block", backgroundSize: "cover" }}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <span>
                            <div className="sk sk-avatar" />
                          </span>
                        </div>

                        <div className="de_countdown">
                          <div className="sk sk-pill" />
                        </div>

                        <div className="nft__item_wrap">
                          <div className="sk sk-img" />
                        </div>

                        <div className="nft__item_info">
                          <div className="sk sk-title" />
                          <div className="sk sk-sub" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {err && (
                <div className="col-12 text-center text-danger py-3">{err}</div>
              )}

              {!loading && !err && (
                <ExploreItems
                  items={visibleItems}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
