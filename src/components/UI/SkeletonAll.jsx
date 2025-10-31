import React from "react";
import { SwiperSlide } from "swiper/react";

/**
 * Reusable adaptive skeleton card for loading states.
 *
 * Supported features types:
 *  - "collection": For HotCollections features section
 *  - "item": For Newitems features section
 *  - "author": For TopSellers features section 
 *  - "default": Simple rectangular skeleton
 *
 * Props:
 *  - type: string ("collection" | "item" | "author" | "default")
 *  - slide: boolean (wrap in <SwiperSlide>)
 */

const SkeletonCard = ({ type = "default", slide = true }) => {

  const getLayout = () => {

    switch (type) {
      // 🟣 Hot Collections Skeleton
      case "collection":
        return (
            
           <div
            className="nft_coll"
            style={{
              backgroundColor: "#d3d3deff",
              padding: "10px",
              borderRadius: "10px",
              width: "100%", // fixed width for horizontal scrolling
              gap: "10px",
            }}
          >
            <div className="nft_wrap">
              <div className="skeleton" style={{ height: 250}} />
            </div>
            <div className="nft_coll_pp">
              <div
                className="skeleton"
                style={{ borderRadius: "50%", width: 50, height: 50 }}
              />
            </div>
            <div className="nft_coll_info">
              <div className="skeleton-text" style={{ width: "80%" }} />
              <div className="skeleton-text" style={{ width: "50%" }} />
            </div>
          </div>
          
        );

      // 🟢 Individual NFT Item Skeleton
      case "item":
        return (
          <div className="nft__item" style={{ backgroundColor: "#d3d3deff" }}>
            <div className="nft__item_wrap">
              <div className="skeleton" style={{ height: 250 }} />
            </div>
            <div className="nft__item_info">
              <div className="skeleton-text" style={{ width: "70%" }} />
              <div className="skeleton-text" style={{ width: "40%" }} />
            </div>
          </div>
        );

      // 🟠 Author Skeleton (Profile)
      case "author":
        return (
          <div
            className="author_item text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#d3d3deff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              className="skeleton"
              style={{
                borderRadius: "50%",
                width: 5,
                height: 10,
                marginBottom: "10px",
                gap: 10,
              }}
            />
            <div className="skeleton-text" style={{ width: "60%" }} />
            <div className="skeleton-text" style={{ width: "40%" }} />
          </div>
        );

          // 🟢 Individual NFT card Skeleton
      case "card":
        return (
          <div className="nft__item" style={{ backgroundColor: "#d3d3deff", height: 500 }}>
            <div className="nft__item_wrap">
              <div className="skeleton" style={{ height: 350 }} />
            </div>
            
          </div>
        );

      // ⚪ text Skeleton
      case "text":
        return (
          <div
            className="skeleton"
            style={{
              width: "100%",
              height: 150,
              borderRadius: "10px",
              backgroundColor: "#d3d3deff",
            }}
          />
        );

      // ⚪ title Skeleton
      case "title":
        return (
          <div
            className="skeleton"
            style={{
              width: "75%",
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#d3d3deff",
            }}
          />
        );

      // ⚪ price Skeleton
      case "price":
        return (
          <div
            className="skeleton"
            style={{
              width: "15%",
              height: 50,
              borderRadius: "10px",
              backgroundColor: "#d3d3deff",
            }}
          />
        );

         // 🟠 Owner&Creator skeleton
      case "Owner&Creator":
        return (
          <div
            className="author_item text-center"
            style={{
              display: "flex",
               width: 150,
                height: 50,
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#d3d3deff",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              className="skeleton"
              style={{
                borderRadius: "50%",
                width: 10,
                height: 10,
                marginBottom: "10px",
              }}
            />
            <div className="skeleton-text" style={{ width: "60%" }} />
          </div>
        );

          // ⚪ Default Rectangular Skeleton
      default:
        return (
          <div
            className="skeleton"
            style={{
              width: "15%",
              height: 30,
              borderRadius: "10px",
              backgroundColor: "#d3d3deff",
            }}
          />
        );
    }
  };

  return getLayout();

};

export default SkeletonCard;