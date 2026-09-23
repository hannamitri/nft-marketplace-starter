import React, { useEffect } from "react";
import ExploreItemCard from "./ExploreItemCard";
import SkeletonCard from "./SkeletonCard";

const ExploreItems = ({ items, loading, visibleCount, onReachBottom }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 50) {
        onReachBottom();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onReachBottom]);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      {loading
        ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
        : visibleItems.map((item) => (
            <ExploreItemCard key={item.id || item.nftId || item.nft_id} item={item} />
          ))}
    </>
  );
};

export default ExploreItems;


