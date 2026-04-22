import React, { useEffect, useMemo, useState } from "react";
import { resolveImageSource } from "../../utils/imageFallback";

const warningStyle = {
  fontSize: "12px",
  color: "#ff7a7a",
  display: "block",
  marginTop: "6px",
};

const placeholderStyle = {
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt = "",
  className = "",
  warningText = "Image does not exist",
}) => {
  const initialSrc = useMemo(
    () => resolveImageSource(src, fallbackSrc),
    [src, fallbackSrc]
  );
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [showWarning, setShowWarning] = useState(initialSrc !== src);

  useEffect(() => {
    setCurrentSrc(initialSrc);
    setShowWarning(initialSrc !== src);
  }, [initialSrc, src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setShowWarning(true);
      return;
    }
    setCurrentSrc("");
    setShowWarning(true);
  };

  return (
    <span className="d-inline-block w-100">
      {currentSrc ? (
        <img
          className={className}
          src={currentSrc}
          alt={alt}
          onError={handleError}
        />
      ) : (
        <span style={placeholderStyle}>{warningText}</span>
      )}
      {showWarning && <span style={warningStyle}>{warningText}</span>}
    </span>
  );
};

export default ImageWithFallback;
