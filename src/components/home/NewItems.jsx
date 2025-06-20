import React from "react";
import useSWR from "swr";
import { useKeenSlider } from "keen-slider/react";
import useInterval from "../../hooks/useInterval";
import NftItem from "../NftItem";
import NftSkeleton from "../NftSkeleton";

const NewItems = () => {
  useInterval();
  const { data: items = [], isLoading } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
  );
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 450px)": {
          slides: { perView: 2 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3 },
        },
        "(min-width: 1200px)": {
          slides: { perView: 4 },
        },
      },
      slides: { perView: 1 },
    },
    [
      // add plugins here
    ]
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row row--collections">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { isLoading && (
            <div ref={sliderRef} className="keen-slider">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <NftSkeleton key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide" />
                ))}
            </div>
          )}
          { !isLoading && (
            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <NftItem key={item.id} nft={item} className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide" />
              ))}
            </div>
          )}
          <button
            className="slider-btn slider-btn--prev"
            onClick={() => instanceRef.current?.prev()}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            className="slider-btn slider-btn--next"
            onClick={() => instanceRef.current?.next()}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
