import React from "react";

const SkeletonSeller = () => {
  return (
    <li className="skeleton-seller">
      <div className="skeleton-avatar" />
      <div className="skeleton-text name" />
      <div className="skeleton-text price" />

      <style>{`
        .skeleton-seller {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
        }
        .skeleton-avatar {
          width: 50px;
          height: 50px;
          background: #e0e0e0;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }
        .skeleton-text {
          height: 12px;
          background: #ddd;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        .skeleton-text.name {
          width: 100px;
        }
        .skeleton-text.price {
          width: 50px;
        }
        .skeleton-avatar::before,
        .skeleton-text::before {
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
        @keyframes shimmer {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </li>
  );
};

export default SkeletonSeller;