import React from "react";
import "./skeleton.css"; // yo cargo mis estilos del shimmer

export default function SkeletonCard() {
  return (
    <div className="nft__item skeleton">
      <div className="skeleton-avatar shimmer" />
      <div className="skeleton-media shimmer" />
      <div className="skeleton-lines">
        <div className="skeleton-line shimmer" style={{ width: "70%" }} />
        <div className="skeleton-line shimmer" style={{ width: "40%" }} />
      </div>
    </div>
  );
}


// // I render a card-shaped skeleton with a shimmer
// import React from "react";
// import "./skeleton.css"; // my styles for the shimmer + grid

// export default function SkeletonCard() {
//   return (
//     <div className="nft-card skeleton">
//       {/* I keep the same layout proportions as NFTCard */}
//       <div className="nft-image-wrap skel-img skel-shimmer" />
//       <div className="nft-info">
//         <div className="nft-author">
//           <div className="author-avatar skel-shimmer" />
//           <div className="skel-line skel-shimmer" style={{ width: 90 }} />
//         </div>
//         <div className="skel-line skel-shimmer" style={{ width: "65%", marginTop: 10 }} />
//         <div className="skel-line skel-shimmer" style={{ width: "40%", marginTop: 8 }} />
//       </div>
//     </div>
//   );
// }
