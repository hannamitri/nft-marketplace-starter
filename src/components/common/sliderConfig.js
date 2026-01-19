// Shared slider settings for Hot Collections and New Items
export const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3, slidesToScroll: 1 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, slidesToScroll: 1 }
    }
  ]
};

// Button styling for slider prev/next controls
export const sliderButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "#fff",
  border: "2px solid #333",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  cursor: "pointer",
  zIndex: 10,
  color: "#333"
};

// Image wrapper styling
export const imageWrapperStyle = {
  padding: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

// Image styling
export const imageStyle = {
  maxWidth: "85%",
  maxHeight: "170px",
  height: "auto"
};
