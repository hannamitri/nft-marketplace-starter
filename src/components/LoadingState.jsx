import React, { useEffect, useState } from "react";
import "./LoadingState.css";

const LoadingState = ({
  loading,
  children,
  showTitle = false,
  showAuthor = false,
}) => {
  const fullArray = [1, 2, 3, 4];
  const [visibleItems, setVisibleItems] = useState([fullArray]);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;

      if (width >= 1200) setVisibleItems(fullArray.slice(0, 4));
      else if (width >= 768) setVisibleItems(fullArray.slice(0, 3));
      else if (width >= 480) setVisibleItems(fullArray.slice(0, 2));
      else setVisibleItems(fullArray.slice(0, 1));
    };
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  if (loading) {
    return (
      <div className="skeleton__loading">
        {showTitle && (
          <>
            <div className="skeleton-title"></div>
            <div className="small-border bg-color-2"></div>
          </>
        )}
        {showAuthor && (
          <>
            <div className="skeleton skeleton-banner"></div>
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="skeleton skeleton-circle" /> 
                  <i className="fa fa-check skeleton-check"></i>
                  <div>
                    <div className="skeleton skeleton-text name"></div>
                    <div className="skeleton skeleton-text username"></div>
                    <div className="skeleton skeleton-text address"></div>
                  </div>
                </div>
                <div className="de-flex-col">
                  <div className="skeleton skeleton-follow"></div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="skeleton-tiles-grid">
          {visibleItems.map((_, i) => (
            <div className="skeleton__tile" key={i}>
              <div className="skeleton__tile-img"></div>
              <div className="skeleton__tile-author"></div>
              <div className="skeleton__tile-name"></div>
              <div className="skeleton__tile-code"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default LoadingState;
