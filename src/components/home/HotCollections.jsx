import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

const HotCollections = ( { hotCollectionsUsersData, hotCollectionsLoading, owlCarouselPresets } ) => {
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            className="owl-theme owl-style"
            items={4}
            lazyLoad
            merge
            {...owlCarouselPresets}
          >
            {hotCollectionsLoading
              ? 
              new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                <div className="skeleton nft__coll--skeleton ">
                  <div className="skeleton-box nft__img--skeleton">
                  </div>
                  <div className="nft_coll_user_container skeleton-box"></div>
                </div>
                <figure className="check--skeleton">
                  <i className="fa fa-check fa-check--skeleton"></i>
                  </figure>
                <div className="skeleton nft__name-skeleton skeleton-box"></div>
                <div className="skeleton nft__id--skeleton skeleton-box"></div>
              </div>
                ))
              : (hotCollectionsUsersData &&
              hotCollectionsUsersData.map((user, index) => (
                  <div className="" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${user.nftId}`}>
                          <img
                            src={user.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_user_container">
                        <div className="nft_coll_pp">
                          <Link to={`/author/${user.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={user.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{user.title}</h4>
                          </Link>
                          <span>ERC-{user.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )))
                }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
