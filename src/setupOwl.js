import $ from "jquery";

// Ensure jQuery is available globally for Owl Carousel
if (typeof window !== "undefined") {
  window.$ = window.jQuery = $;
  // Load the Owl Carousel jQuery plugin AFTER jQuery is on window
  // Using require here ensures correct load order without linter import-order errors
  // eslint-disable-next-line global-require
  require("owl.carousel");
}


