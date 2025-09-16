import React from "react";

const SkeletonAuthor = () => {
  return (
    <div className="skeleton-author">
      {/* Banner */}
      <div className="skeleton skeleton-banner"></div>

      {/* Profile */}
      <div className="skeleton-profile">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-text name"></div>
        <div className="skeleton skeleton-text username"></div>
        <div className="skeleton skeleton-text wallet"></div>
      </div>

      {/* Followers & Button */}
      <div className="skeleton-follow">
        <div className="skeleton skeleton-text followers"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
      <style>{`
        .skeleton {
          background: #e0e0e0;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }
        .skeleton::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(
            90deg,
            rgba(224, 224, 224, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(224, 224, 224, 0) 100%
          );
          animation: shimmer 1.5s infinite;
        }

        .skeleton-banner {
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
        }
        .skeleton-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .skeleton-text {
          height: 14px;
          margin: 6px 0;
        }
        .skeleton-text.name {
          width: 150px;
          height: 20px;
        }
        .skeleton-text.username {
          width: 100px;
        }
        .skeleton-text.wallet {
          width: 200px;
        }
        .skeleton-text.followers {
          width: 80px;
        }
        .skeleton-button {
          width: 100px;
          height: 35px;
          border-radius: 20px;
          margin-top: 10px;
        }

        @keyframes shimmer {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SkeletonAuthor;