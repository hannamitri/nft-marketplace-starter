import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="nft__item">
    <div className="author_list_pp">
      <div className="lazy skeleton newItems__authorImage--skeleton" />
    </div>

    <div className="nft__item_wrap">
      <div className="nft__item_extra">
        <div className="nft__item_buttons">
          <button>Buy Now</button>
          <div className="nft__item_share">
            <h4>Share</h4>
            <button type="button">
              <i className="fa fa-facebook fa-lg"></i>
            </button>
            <button type="button">
              <i className="fa fa-twitter fa-lg"></i>
            </button>
            <button type="button">
              <i className="fa fa-envelope fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="lazy nft__item_preview skeleton newItems__img--skeleton" />
    </div>
    <div className="nft__item_info">
      <h4 className="newItems__title--skeleton skeleton">
        &nbsp;
      </h4>
      <div className="nft__item_price newItems__price--skeleton skeleton">
        &nbsp;
      </div>
    </div>
    <div className="nft__item_like newItems__like--skeleton skeleton"></div>
  </div>
  )
}

export default CardSkeleton

