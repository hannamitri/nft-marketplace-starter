import OwlCarousel from "react-owl-carousel";
import UserCards from "../reusable-components/UserCards";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const NewItems = ({
  newItemsUsersData,
  newItemsLoading,
  owlCarouselPresets,
}) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-duration="1000">
                New Items
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            data-aos="fade-up"
            data-aos-duration="1500"
            className="owl-theme owl-style"
            items={4}
            lazyLoad
            merge
            {...owlCarouselPresets}
          >
            {newItemsLoading ? (
              <div className="nft__item">
                <div className="skeleton nft__coll--skeleton skeleton-style">
                  <div className="skeleton-box nft__img--skeleton nft__newItem--position"></div>
                  <div className="skeleton-box"></div>
                </div>
                <figure className="check--skeleton nft__newItem--pp--position">
                  <i className="fa fa-check fa-check--skeleton nft__newItem--checkmark--position"></i>
                </figure>
                <div className="nft__detail--container">
                  <div className="skeleton nft__name-skeleton skeleton-box"></div>
                  <div className="skeleton nft__id--skeleton skeleton-box"></div>
                  <div className="nft__detail--container-heart">
                    <div className="skeleton-box heart--skeleton"></div>
                  </div>
                </div>
              </div>
            ) : (
              newItemsUsersData && (
                <UserCards newItemsUsersData={newItemsUsersData} />
              )
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
