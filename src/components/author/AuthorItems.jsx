import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuthorItems = ({ items }) => {
  const [loadingpage, setLoadingpage] = useState(true);

  // 💡 Simulate loading ONCE on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("✅ Loading complete");
      setLoadingpage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
 console.log("items", items);
console.log("loadingpage", loadingpage);
  const responsiveSettings = {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 },
    1200: { items: 4 },
  };

  const renderSkeletonItem = (_, i) => (
    <div className="nft_coll" key={i}>
          <div className="nft_wrap">
            <Skeleton height={200} />
          </div>
    
          <div className="nft_coll_pp">
            <Skeleton circle={true} height={50} width={50} />
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <h4><Skeleton width={100} /></h4>
            <span><Skeleton width={60} /></span>
          </div>
        </div>
  );

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <OwlCarousel
          key={loadingpage ? "loading" : "loaded"}  // 🔥 This forces remount
          className="owl-theme"
          responsive={responsiveSettings}
          loop
          margin={10}
          nav
        >
          {loadingpage
            ? Array.from({ length: 4 }).map(renderSkeletonItem)
            : items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.nftId}`}>
                        <img className="lazy" src={item.nftImage} alt="author" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default AuthorItems;