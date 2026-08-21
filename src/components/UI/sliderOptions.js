// Shared keen-slider config: HotCollections and NewItems used identical
// inline copies of this object.
export const sliderOptions = {
  loop: true,
  slides: {
    perView: 4,
    spacing: 20,
  },
  breakpoints: {
    "(max-width: 991px)": {
      slides: { perView: 2, spacing: 15 },
    },
    "(max-width: 575px)": {
      slides: { perView: 1, spacing: 15 },
    },
  },
};

export default sliderOptions;
