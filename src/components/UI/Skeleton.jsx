import "../../css/styles/Skeleton.css";

function Skeleton() {
  return (
    <article
      className="new-item-skeleton"
      aria-hidden="true"
    >
      <div className="skeleton-card-top">
        <div className="skeleton-author-circle skeleton-shimmer"></div>

        <div className="skeleton-timer skeleton-shimmer"></div>
      </div>

      <div className="skeleton-nft-image skeleton-shimmer"></div>

      <div className="skeleton-card-bottom">
        <div className="skeleton-title skeleton-shimmer"></div>

        <div className="skeleton-bottom-row">
          <div className="skeleton-price skeleton-shimmer"></div>

          <div className="skeleton-likes skeleton-shimmer"></div>
        </div>
      </div>
    </article>
  );
}

export default Skeleton;