import React from "react";

/**
 * The share/buy overlay was duplicated in three components with
 * `href=""` links that reloaded the page on click. Centralised here.
 */
const ItemShareButtons = () => {
  const notImplemented = (event) => {
    event.preventDefault();
    alert("This feature has not been implemented yet");
  };

  return (
    <div className="nft__item_extra">
      <div className="nft__item_buttons">
        <button type="button" onClick={notImplemented}>
          Buy Now
        </button>

        <div className="nft__item_share">
          <h4>Share</h4>

          <a href="#facebook" onClick={notImplemented} aria-label="Share on Facebook">
            <i className="fa fa-facebook fa-lg"></i>
          </a>

          <a href="#twitter" onClick={notImplemented} aria-label="Share on Twitter">
            <i className="fa fa-twitter fa-lg"></i>
          </a>

          <a href="#email" onClick={notImplemented} aria-label="Share by email">
            <i className="fa fa-envelope fa-lg"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemShareButtons;
