import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import TopSellerRowSkeleton from "../common/TopSellerRowSkeleton";
import { useExploreNftsContext } from "../../context/ExploreNftsContext";
import { buildAuthorsUrl } from "../../constants/api";

const TOP_SELLERS_COUNT = 12;

const TopSellers = () => {
  const { uniqueItems, loading, error } = useExploreNftsContext();
  const [authorNamesById, setAuthorNamesById] = useState({});

  const topAuthors = useMemo(() => {
    const map = new Map();

    uniqueItems.forEach((item) => {
      const authorId = item.authorId;
      if (authorId === undefined || authorId === null || authorId === "") {
        return;
      }

      const key = String(authorId);
      const priceValue = Number(item.price);
      const amount = Number.isNaN(priceValue) ? 0 : priceValue;

      if (!map.has(key)) {
        map.set(key, {
          authorId: key,
          authorImage: item.authorImage || "",
          totalEth: amount,
        });
      } else {
        const current = map.get(key);
        current.totalEth += amount;
      }
    });

    return Array.from(map.values())
      .sort((a, b) => b.totalEth - a.totalEth)
      .slice(0, TOP_SELLERS_COUNT);
  }, [uniqueItems]);

  useEffect(() => {
    if (topAuthors.length === 0) {
      setAuthorNamesById({});
      return;
    }

    let mounted = true;
    const controller = new AbortController();

    const loadNames = async () => {
      try {
        const entries = await Promise.all(
          topAuthors.map(async (author) => {
            const response = await fetch(buildAuthorsUrl(author.authorId), {
              signal: controller.signal,
            });
            if (!response.ok) {
              return [author.authorId, ""];
            }
            const payload = await response.json();
            const name = typeof payload?.authorName === "string" ? payload.authorName : "";
            return [author.authorId, name];
          })
        );

        if (mounted) {
          setAuthorNamesById(Object.fromEntries(entries));
        }
      } catch (fetchError) {
        if (fetchError.name !== "AbortError" && mounted) {
          setAuthorNamesById({});
        }
      }
    };

    loadNames();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [topAuthors]);

  return (
    <section
      id="section-popular"
      className="pb-5"
      data-aos="fade-up"
      data-aos-easing="ease-out"
      data-aos-duration="800"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading &&
                new Array(TOP_SELLERS_COUNT)
                  .fill(0)
                  .map((_, index) => <TopSellerRowSkeleton key={`seller-${index}`} />)}
              {error && (
                <li>
                  <p>{error}</p>
                </li>
              )}
              {!loading &&
                !error &&
                topAuthors.map((author, index) => (
                <li key={author.authorId ?? index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage || AuthorImage}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.src = AuthorImage;
                        }}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>
                      {authorNamesById[author.authorId]?.trim() ||
                        `Creator #${String(author.authorId).slice(0, 6)}`}
                    </Link>
                    <span>{author.totalEth.toFixed(2)} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
